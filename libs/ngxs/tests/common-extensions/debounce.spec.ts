import {Injectable} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {DataAction, Debounce, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {NgxsModule, State} from '@ngxs/store';

describe('[TEST]: Debounce', () => {
    it('should be check ngZone', () => {
        let message: string | null = null;

        try {
            class App {
                @Debounce()
                public invoke(): void {
                    // ...
                }
            }

            new App().invoke();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_MODULE_EXCEPTION);
    });

    it('should be correct invoke', fakeAsync(() => {
        const spy = jest.spyOn(console, 'warn').mockImplementation();

        @StateRepository()
        @State({name: 'count', defaults: 0})
        @Injectable()
        class DebounceState extends NgxsImmutableDataRepository<number> {
            @Debounce()
            @DataAction()
            public increment(): void {
                this.setState((state: number): number => state + 1);
            }

            @Debounce(50)
            @DataAction()
            public decrement(): void {
                this.setState((state: number): number => state - 1);
            }

            @Debounce(50)
            @DataAction()
            public incrementByValue(value: number): number {
                this.setState((state: number): number => state + value);

                return this.getState();
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([DebounceState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        const state: DebounceState = TestBed.inject<DebounceState>(DebounceState);

        expect(state.getState()).toBe(0);

        state.increment();
        state.increment();
        state.increment();
        state.increment();
        state.increment();
        state.increment();
        state.increment();

        expect(state.getState()).toBe(0);

        tick(300);

        expect(state.getState()).toBe(1);

        state.decrement();
        state.decrement();
        state.decrement();
        state.decrement();

        expect(state.getState()).toBe(1);

        tick(50);

        expect(state.getState()).toBe(0);

        state.decrement();
        state.decrement();
        state.decrement();
        state.decrement();

        expect(state.getState()).toBe(0);

        tick(50);

        expect(state.getState()).toBe(-1);

        const value1 = state.incrementByValue(6);
        const value2 = state.incrementByValue(6);
        const value3 = state.incrementByValue(6);

        tick(50);

        expect(value1).toBeUndefined();
        expect(value2).toBeUndefined();
        expect(value3).toBeUndefined();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenLastCalledWith(
            NGXS_DATA_EXCEPTIONS.NGXS_DATA_ASYNC_ACTION_RETURN_TYPE,
            -1,
        );
    }));
});
