import {Component, Injectable} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Immutable} from '@angular-ru/cdk/typings';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {Action, NgxsModule, State, StateContext, Store} from '@ngxs/store';

describe('[TEST]: Freeze states when extends NgxsDataRepository', () => {
    it('should be throw exception when forgot add StateRepository', () => {
        let message: string | null = null;

        try {
            @State({
                name: 'myState',
                defaults: 1,
            })
            @Injectable()
            class MyAppState extends NgxsDataRepository<any> {
                constructor() {
                    super();
                    this.ctx.getState();
                }
            }

            TestBed.configureTestingModule({
                imports: [
                    NgxsModule.forRoot([MyAppState], {developmentMode: true}),
                    NgxsDataPluginModule.forRoot(),
                ],
            });

            TestBed.inject(MyAppState);
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
    });

    it('should be throw exception when use context before bootstrap', () => {
        let message: string | null = null;

        try {
            @StateRepository()
            @State({
                name: 'myState',
                defaults: 1,
            })
            @Injectable()
            class MyState extends NgxsDataRepository<any> {
                constructor() {
                    super();
                    this.ctx.getState();
                }
            }

            TestBed.configureTestingModule({
                imports: [
                    NgxsModule.forRoot([MyState], {developmentMode: true}),
                    NgxsDataPluginModule.forRoot(),
                ],
            });

            TestBed.inject(MyState);
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_MODULE_EXCEPTION);
    });

    it('should be return null from state', () => {
        interface CustomType {
            a: number;
        }

        @StateRepository()
        @State({
            name: 'myState',
            defaults: null,
        })
        @Injectable()
        class MyDataState extends NgxsDataRepository<CustomType> {
            @Action({type: 'myState.set'})
            public concat({setState}: StateContext<CustomType>): void {
                setState({a: 15});
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([MyDataState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);
        const state: MyDataState = TestBed.inject<MyDataState>(MyDataState);

        expect(store.snapshot()).toEqual({myState: null});
        expect(state.getState()).toBeNull();

        state.setState({a: 5});
        expect(state.getState()).toEqual({a: 5});

        const immutable: Immutable<CustomType> = {a: 10};

        state.patchState(immutable);

        expect(state.getState()).toEqual({a: 10});

        state.reset();

        expect(state.getState()).toBeNull();

        // eslint-disable-next-line rxjs/no-ignored-observable
        state.dispatch({type: 'myState.set'});

        expect(state.getState()).toEqual({a: 15});
    });

    it('should be return array from state', () => {
        interface StateModel {
            a?: number;
            b?: number;
        }

        @StateRepository()
        @State<StateModel[]>({
            name: 'myArrState',
            defaults: [{a: 1}, {b: 3}],
        })
        @Injectable()
        class MyDataArrState extends NgxsDataRepository<StateModel[]> {}

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([MyDataArrState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);
        const state: MyDataArrState = TestBed.inject<MyDataArrState>(MyDataArrState);

        expect(store.snapshot()).toEqual({myArrState: [{a: 1}, {b: 3}]});
        expect(state.getState()).toEqual([{a: 1}, {b: 3}]);

        const snapshot: StateModel[] = state.getState();
        // noinspection DuplicatedCode
        let message: string | null = null;

        try {
            snapshot[0]!.a!++;
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        // eslint-disable-next-line @typescript-eslint/quotes
        expect(
            `Cannot assign to read only property 'a' of object '[object Object]'`,
        ).toEqual(message);

        try {
            snapshot[0]!.b = 3;
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect('Cannot add property b, object is not extensible').toEqual(message);

        try {
            snapshot[1]!.b!++;
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        // eslint-disable-next-line @typescript-eslint/quotes
        expect(
            `Cannot assign to read only property 'b' of object '[object Object]'`,
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
        class MyDateState extends NgxsDataRepository<DateModel> {}

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([MyDateState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);
        const state: MyDateState = TestBed.inject<MyDateState>(MyDateState);

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
        class StateDataListState extends NgxsDataRepository<ListModel[]> {}

        @Component({selector: 'app', template: '{{ app.state$ | async | json }}'})
        class AppComponent {
            constructor(public app: StateDataListState) {}
        }

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                NgxsModule.forRoot([StateDataListState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        }).compileComponents();

        const fixture: ComponentFixture<AppComponent> =
            TestBed.createComponent(AppComponent);

        fixture.autoDetectChanges();

        expect(JSON.parse(fixture.nativeElement.innerHTML)).toEqual([
            {a: 1, b: 2},
            {a: 3, b: 4},
        ]);

        const state: StateDataListState = fixture.componentInstance.app;

        let message: string | null = null;

        try {
            state.getState().reverse();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        // eslint-disable-next-line @typescript-eslint/quotes
        expect(message).toBe(
            "Cannot assign to read only property '0' of object '[object Array]'",
        );

        const list: ListModel[] = [{a: 5, b: 7}];

        state.setState(list);

        expect(state.getState()).toEqual([{a: 5, b: 7}]);
    });
});
