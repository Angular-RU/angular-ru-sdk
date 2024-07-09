import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataFactory} from '@angular-ru/ngxs/internals';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {NgxsRepositoryMeta} from '@angular-ru/ngxs/typings';
import {Actions, NgxsModule, ofActionDispatched, State, Store} from '@ngxs/store';

describe('[TEST]: CountState', () => {
    let store: Store;
    let message: string | null = null;

    beforeEach(() => {
        message = null;
    });

    it('should be get correct snapshot from simple state', () => {
        @State({name: 'count', defaults: 0})
        @Injectable()
        class CountState {}

        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([CountState], {developmentMode: true})],
        });

        store = TestBed.inject<Store>(Store);

        expect(store.snapshot()).toEqual({count: 0});
    });

    describe('exceptions', () => {
        it('@StateRepository should be add before decorator @State', () => {
            try {
                @Injectable()
                @State({
                    name: 'count',
                    defaults: 0,
                })
                @StateRepository()
                class CountState extends NgxsImmutableDataRepository<number> {}

                TestBed.configureTestingModule({
                    imports: [NgxsModule.forRoot([CountState], {developmentMode: true})],
                });
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE);
        });

        it('should be throw exception when not import NgxsDataModulePlugin', () => {
            @StateRepository()
            @State({
                name: 'count',
                defaults: 0,
            })
            @Injectable()
            class CountState extends NgxsImmutableDataRepository<number> {}

            TestBed.configureTestingModule({
                imports: [NgxsModule.forRoot([CountState], {developmentMode: true})],
            });

            store = TestBed.inject<Store>(Store);
            const count: CountState = TestBed.inject<CountState>(CountState);

            expect(store.snapshot()).toEqual({count: 0});

            try {
                count.getState();
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_MODULE_EXCEPTION);
        });

        it('should be throw when forgot add @StateRepository #1', () => {
            @State({
                name: 'count',
                defaults: 0,
            })
            @Injectable()
            class CountState extends NgxsImmutableDataRepository<number> {}

            TestBed.configureTestingModule({
                imports: [
                    NgxsModule.forRoot([CountState], {developmentMode: true}),
                    NgxsDataPluginModule.forRoot(),
                ],
            });

            const count: CountState = TestBed.inject<CountState>(CountState);

            try {
                count.getState();
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
        });

        it('should be throw when forgot add @StateRepository #2', () => {
            @State({
                name: 'count',
                defaults: 0,
            })
            @Injectable()
            class CountState extends NgxsImmutableDataRepository<number> {}

            TestBed.configureTestingModule({
                imports: [
                    NgxsModule.forRoot([], {developmentMode: true}),
                    NgxsDataPluginModule.forRoot(),
                ],
                providers: [CountState],
            });

            const count: CountState = TestBed.inject<CountState>(CountState);

            try {
                count.getState();
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
        });

        it('should be throw when invalid instance', () => {
            try {
                NgxsDataFactory.getRepositoryByInstance(null);
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
        });

        it('should be throw when use @DataAction without context', () => {
            @State({
                name: 'count',
                defaults: 0,
            })
            @Injectable()
            class CountState {
                @DataAction()
                public incorrect(): void {
                    // ...
                }
            }

            TestBed.configureTestingModule({
                imports: [NgxsModule.forRoot([CountState], {developmentMode: true})],
            });

            const count: CountState = TestBed.inject<CountState>(CountState);

            try {
                count.incorrect();
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
        });

        it('should be throw when use static with @DataAction', () => {
            try {
                @State({
                    name: 'count',
                    defaults: 0,
                })
                @StateRepository()
                @Injectable()
                class CountState {
                    @DataAction()
                    public static incorrect(): void {
                        // ...
                    }
                }

                CountState.incorrect();
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATIC_ACTION);
        });
    });

    describe('correct behavior NGXS DATA', () => {
        let count: CountState;
        let actions$: Actions;

        @StateRepository()
        @State({
            name: 'count',
            defaults: 0,
        })
        @Injectable()
        class CountState extends NgxsImmutableDataRepository<number> {
            @DataAction()
            public withAction(@Payload('val') value: number): void {
                this.ctx.setState(value);
            }

            public withoutAction(value: number): void {
                this.ctx.setState(value);
            }
        }

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    NgxsModule.forRoot([CountState], {developmentMode: true}),
                    NgxsDataPluginModule.forRoot(),
                ],
            });

            count = TestBed.inject<CountState>(CountState);
            store = TestBed.inject<Store>(Store);
            actions$ = TestBed.inject<Actions>(Actions);
        });

        afterEach(() => {
            NgxsDataFactory.clearMetaByInstance(count);
        });

        it('should be correct get name', () => {
            expect(count.name).toBe('count');
        });

        it('should be correct works with setState/getState', () => {
            const nextValue: number[] = [];

            count.state$.subscribe((value: number) => nextValue.push(value));

            expect(count.getState()).toBe(0);
            expect(store.snapshot()).toEqual({count: 0});

            count.setState(10);
            count.reset();

            count.setState((state: number) => state + 1);
            count.setState((state: number) => state - 1);
            count.setState((state: number) => state + 1);

            expect(count.getState()).toBe(1);
            expect(store.snapshot()).toEqual({count: 1});

            count.reset();
            expect(count.getState()).toBe(0);
            expect(store.snapshot()).toEqual({count: 0});

            expect(nextValue).toEqual([0, 10, 0, 1, 0, 1, 0]);
        });

        it('should be correct works with withoutAction/withAction', () => {
            const dispatched: {type: string}[] = [];

            actions$
                .pipe(ofActionDispatched({type: '@count.withAction(val)'}))
                .subscribe((value) => dispatched.push(value));

            expect(count.getState()).toBe(0);
            expect(store.snapshot()).toEqual({count: 0});

            count.withoutAction(5);

            expect(count.getState()).toBe(5);
            expect(store.snapshot()).toEqual({count: 5});

            count.withAction(15);
            expect(count.getState()).toBe(15);
            expect(store.snapshot()).toEqual({count: 15});

            count.withAction(10);
            expect(count.getState()).toBe(10);
            expect(store.snapshot()).toEqual({count: 10});

            expect(dispatched).toEqual([{val: 15}, {val: 10}]);
        });

        it('should be correct instance repository', () => {
            const repository: NgxsRepositoryMeta =
                NgxsDataFactory.getRepositoryByInstance(count);

            expect(repository.stateMeta!.name).toBe('count');
            expect(repository.stateMeta!.actions).toEqual({});
            expect(repository.operations).toEqual({});
            expect(count.getState()).toBe(0);

            count.setState(1);
            expect(count.getState()).toBe(1);

            count.withAction(2);
            expect(count.getState()).toBe(2);

            count.reset();
            expect(count.getState()).toBe(0);

            expect(repository.stateMeta!.actions).toEqual({
                '@count.setState(stateValue)': [
                    {
                        type: '@count.setState(stateValue)',
                        options: {cancelUncompleted: true},
                        fn: '@count.setState(stateValue)',
                    },
                ],
                '@count.withAction(val)': [
                    {
                        type: '@count.withAction(val)',
                        options: {cancelUncompleted: true},
                        fn: '@count.withAction(val)',
                    },
                ],
                '@count.reset()': [
                    {
                        type: '@count.reset()',
                        options: {cancelUncompleted: true},
                        fn: '@count.reset()',
                    },
                ],
            });

            expect(repository.operations).toEqual({
                setState: {
                    type: '@count.setState(stateValue)',
                    options: {cancelUncompleted: true},
                },
                withAction: {
                    type: '@count.withAction(val)',
                    options: {cancelUncompleted: true},
                },
                reset: {
                    type: '@count.reset()',
                    options: {cancelUncompleted: true},
                },
            });
        });
    });
});
