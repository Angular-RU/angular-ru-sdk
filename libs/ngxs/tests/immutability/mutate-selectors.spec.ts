import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Immutable} from '@angular-ru/cdk/typings';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {NgxsModule, State, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

describe('mutate', () => {
    let store: Store;

    it('should be throw incorrect provides', function () {
        let message: string | null = null;

        try {
            @StateRepository()
            @State({name: 'todos', defaults: [1, 3]})
            @Injectable()
            class TodosState extends NgxsImmutableDataRepository<string[]> {
                // noinspection JSUnusedGlobalSymbols
                public mutable$ = this.state$.pipe(
                    map((state) => (state as string[]).reverse()),
                );
            }

            TestBed.configureTestingModule({
                imports: [NgxsModule.forRoot([TodosState], {developmentMode: true})],
            });

            store = TestBed.inject<Store>(Store);
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_MODULE_EXCEPTION);
    });

    it('should be check mutate state', () => {
        @StateRepository()
        @State({name: 'todos', defaults: [1, 2, 3]})
        @Injectable()
        class TodosState extends NgxsImmutableDataRepository<string[]> {
            public mutable$(): Observable<Immutable<string[]>> {
                return this.state$.pipe(map((state) => (state as string[]).reverse()));
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([TodosState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        store = TestBed.inject<Store>(Store);

        const todo: TodosState = TestBed.inject<TodosState>(TodosState);

        expect(store.snapshot()).toEqual({todos: [1, 2, 3]});

        let errorResult: string | null = null;

        todo.state$.pipe(map((state) => state.concat().reverse())).subscribe((state) => {
            expect(store.snapshot()).toEqual({todos: [1, 2, 3]});
            expect(state).toEqual([3, 2, 1]);
        });

        todo.mutable$().subscribe({
            next: () => {
                // ...
            },
            error: (error: unknown) => {
                errorResult = (error as Error).message;
            },
        });

        expect(errorResult).toBe(
            "Cannot assign to read only property '0' of object '[object Array]'",
        );
        expect(store.snapshot()).toEqual({todos: [1, 2, 3]});
    });

    it('should be immutable', () => {
        interface A {
            a: number;
        }

        @StateRepository()
        @State<A[]>({
            name: 'todos',
            defaults: [{a: 1}, {a: 2}],
        })
        @Injectable()
        class TodosState extends NgxsImmutableDataRepository<A[]> {}

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([TodosState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        store = TestBed.inject<Store>(Store);
        const todo: TodosState = TestBed.inject<TodosState>(TodosState);

        todo.state$.subscribe((state) => {
            expect(Object.isFrozen(state)).toBe(true);
        });

        let errorResult: string | null = null;

        expect(todo.getState()).toEqual([{a: 1}, {a: 2}]);
        expect(Object.isFrozen(todo.getState())).toBe(true);

        try {
            (todo.getState() as A[]).reverse();
        } catch (error: unknown) {
            errorResult = (error as Error).message;
        }

        expect(errorResult).toBe(
            "Cannot assign to read only property '0' of object '[object Array]'",
        );

        try {
            (todo.getState() as A[])[0].a++;
        } catch (error: unknown) {
            errorResult = (error as Error).message;
        }

        expect(errorResult).toBe(
            "Cannot assign to read only property 'a' of object '[object Object]'",
        );
    });
});
