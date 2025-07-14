import {AsyncPipe, JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, Injectable} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {provideStore, State, Store} from '@ngxs/store';

describe('[TEST]: Freeze states', () => {
    it('should be return null from state', () => {
        @StateRepository()
        @State({
            name: 'myState',
            defaults: null,
        })
        @Injectable()
        class MyState extends NgxsImmutableDataRepository<string> {}

        TestBed.configureTestingModule({
            providers: [
                provideStore([MyState], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);
        const state: MyState = TestBed.inject<MyState>(MyState);

        expect(store.snapshot()).toEqual({myState: null});
        expect(state.getState()).toBeNull();
    });

    it('should be return array from state', () => {
        interface StateModel {
            a?: number;
            b?: number;
        }

        @StateRepository()
        @State<StateModel[]>({
            name: 'myArrState',
            defaults: [{a: 1}, {b: 2}],
        })
        @Injectable()
        class MyArrState extends NgxsImmutableDataRepository<StateModel[]> {}

        TestBed.configureTestingModule({
            providers: [
                provideStore([MyArrState], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);
        const state: MyArrState = TestBed.inject<MyArrState>(MyArrState);

        expect(store.snapshot()).toEqual({myArrState: [{a: 1}, {b: 2}]});
        expect(state.getState()).toEqual([{a: 1}, {b: 2}]);

        const snapshot: StateModel[] = state.getState() as StateModel[];
        let message: string | null = null;

        try {
            snapshot[0].a!++;
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(
            "Cannot assign to read only property 'a' of object '[object Object]'",
        ).toEqual(message);

        try {
            snapshot[0].b = 3;
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect('Cannot add property b, object is not extensible').toEqual(message);

        try {
            snapshot[1].b!++;
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(
            "Cannot assign to read only property 'b' of object '[object Object]'",
        ).toEqual(message);
    });

    it('should be return date from state', () => {
        interface DateModel {
            date: Date;
        }

        @StateRepository()
        @State<DateModel>({
            name: 'dateState',
            defaults: {
                date: new Date('01.06.1994'),
            },
        })
        @Injectable()
        class DateState extends NgxsImmutableDataRepository<DateModel> {}

        TestBed.configureTestingModule({
            providers: [
                provideStore([DateState], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);
        const state: DateState = TestBed.inject<DateState>(DateState);

        expect(store.snapshot()).toEqual({
            dateState: {
                date: new Date('01.06.1994'),
            },
        });
        expect(state.getState()).toEqual({
            date: new Date('01.06.1994'),
        });

        expect(state.getState().date.getFullYear()).toBe(1994);
    });

    it('should be correct work with immutable array', () => {
        interface ListModel {
            a: number;
            b: number;
        }

        @StateRepository()
        @State<ListModel[]>({
            name: 'stateList',
            defaults: [
                {a: 1, b: 2},
                {a: 3, b: 4},
            ],
        })
        @Injectable()
        class StateListState extends NgxsImmutableDataRepository<ListModel[]> {}

        @Component({
            selector: 'app',
            imports: [AsyncPipe, JsonPipe],
            template: '{{ app.state$ | async | json }}',
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
        class AppComponent {
            public app = inject(StateListState);
        }

        TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                provideStore([StateListState], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
        }).compileComponents();

        const fixture: ComponentFixture<AppComponent> =
            TestBed.createComponent(AppComponent);

        fixture.autoDetectChanges();

        expect(JSON.parse(fixture.nativeElement.innerHTML)).toEqual([
            {a: 1, b: 2},
            {a: 3, b: 4},
        ]);

        const state: StateListState = fixture.componentInstance.app;

        let message: string | null = null;

        try {
            (state.getState() as ListModel[]).reverse();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toBe(
            "Cannot assign to read only property '0' of object '[object Array]'",
        );
    });
});
