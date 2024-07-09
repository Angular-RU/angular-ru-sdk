import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Immutable} from '@angular-ru/cdk/typings';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {Computed, DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataSequence} from '@angular-ru/ngxs/internals';
import {
    NgxsDataRepository,
    NgxsImmutableDataRepository,
} from '@angular-ru/ngxs/repositories';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {NgxsModule, State, Store} from '@ngxs/store';
import {BehaviorSubject} from 'rxjs';

describe('[TEST]: Computed fields', () => {
    it('should be throw when invalid annotated', () => {
        let message: string | null = null;

        try {
            @StateRepository()
            @State({name: 'a', defaults: 'value'})
            @Injectable()
            class A extends NgxsDataRepository<string> {
                @Computed()
                public getSnapshot(): string {
                    return this.ctx.getState();
                }
            }

            TestBed.configureTestingModule({
                imports: [
                    NgxsModule.forRoot([A], {developmentMode: true}),
                    NgxsDataPluginModule.forRoot(),
                ],
            });
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toBe(
            `${NGXS_DATA_EXCEPTIONS.NGXS_COMPUTED_DECORATOR}\nExample: \n@Computed() get getSnapshot() { \n\t .. \n}`,
        );
    });

    it('should be correct memoized state', () => {
        @StateRepository()
        @State({name: 'b', defaults: 'value'})
        @Injectable()
        class B extends NgxsDataRepository<string> {
            public countSnapshot: number = 0;

            @Computed()
            public override get snapshot(): string {
                this.countSnapshot++;

                return this.ctx.getState();
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([B], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        const b: B = TestBed.inject<B>(B); // sequenceId = 0

        expect(b.snapshot).toBe('value');
        expect(b.snapshot).toBe('value');
        expect(b.snapshot).toBe('value');
        expect(b.snapshot).toBe('value');
        expect(b.snapshot).toBe('value');

        b.setState('hello'); // sequenceId = 1

        expect(b.snapshot).toBe('hello');
        expect(b.snapshot).toBe('hello');
        expect(b.countSnapshot).toBe(2);

        b.setState('world'); // sequenceId = 2

        expect(b.snapshot).toBe('world');
        expect(b.snapshot).toBe('world');
        expect(b.snapshot).toBe('world');
        expect(b.snapshot).toBe('world');
        expect(b.countSnapshot).toBe(3);
    });

    describe('calculate total', () => {
        interface OrderLineModel {
            price: number;
            amount: number;
        }

        it('should be correct computed values with NgxsDataRepository', () => {
            @StateRepository()
            @State<OrderLineModel>({
                name: 'orderLine',
                defaults: {
                    price: 0,
                    amount: 1,
                },
            })
            @Injectable()
            class OrderLineState extends NgxsDataRepository<OrderLineModel> {
                public memoized: number = 0;
                public nonMemoized: number = 0;

                @Computed()
                public get total(): number {
                    this.memoized++;

                    return this.snapshot.price * this.snapshot.amount;
                }

                public get classicTotal(): number {
                    this.nonMemoized++;

                    return this.snapshot.price * this.snapshot.amount;
                }

                @DataAction()
                public setPrice(price: number): void {
                    this.ctx.setState((state: OrderLineModel) => ({
                        price,
                        amount: state.amount,
                    }));
                }

                @DataAction()
                public setAmount(amount: number): void {
                    this.ctx.setState((state: OrderLineModel) => ({
                        price: state.price,
                        amount,
                    }));
                }
            }

            TestBed.configureTestingModule({
                imports: [
                    NgxsModule.forRoot([OrderLineState], {developmentMode: true}),
                    NgxsDataPluginModule.forRoot(),
                ],
            });

            const state: OrderLineState = TestBed.inject<OrderLineState>(OrderLineState);

            // noinspection DuplicatedCode
            expect(state.total).toBe(0);
            expect(state.total).toBe(0);
            expect(state.total).toBe(0);
            expect(state.total).toBe(0);
            expect(state.memoized).toBe(1);

            // noinspection DuplicatedCode
            expect(state.classicTotal).toBe(0);
            expect(state.classicTotal).toBe(0);
            expect(state.classicTotal).toBe(0);
            expect(state.classicTotal).toBe(0);
            expect(state.nonMemoized).toBe(4);

            state.setAmount(5);
            state.setPrice(5);

            // noinspection DuplicatedCode
            expect(state.total).toBe(25);
            expect(state.total).toBe(25);
            expect(state.total).toBe(25);
            expect(state.total).toBe(25);
            expect(state.memoized).toBe(2);

            // noinspection DuplicatedCode
            expect(state.classicTotal).toBe(25);
            expect(state.classicTotal).toBe(25);
            expect(state.classicTotal).toBe(25);
            expect(state.classicTotal).toBe(25);
            expect(state.nonMemoized).toBe(8);
        });

        it('should be correct computed values with NgxsImmutableDataRepository', () => {
            @StateRepository()
            @State<OrderLineModel>({
                name: 'orderLine',
                defaults: {
                    price: 0,
                    amount: 1,
                },
            })
            @Injectable()
            class ImmutableOrderLineState extends NgxsImmutableDataRepository<OrderLineModel> {
                public memoized: number = 0;
                public nonMemoized: number = 0;

                @Computed()
                public get total(): number {
                    this.memoized++;

                    return this.snapshot.price * this.snapshot.amount;
                }

                public get classicTotal(): number {
                    this.nonMemoized++;

                    return this.snapshot.price * this.snapshot.amount;
                }

                @DataAction()
                public setPrice(price: number): void {
                    this.ctx.setState((state: Immutable<OrderLineModel>) => ({
                        price,
                        amount: state.amount,
                    }));
                }

                @DataAction()
                public setAmount(amount: number): void {
                    this.ctx.setState((state: Immutable<OrderLineModel>) => ({
                        price: state.price,
                        amount,
                    }));
                }
            }

            TestBed.configureTestingModule({
                imports: [
                    NgxsModule.forRoot([ImmutableOrderLineState], {
                        developmentMode: true,
                    }),
                    NgxsDataPluginModule.forRoot(),
                ],
            });

            const state: ImmutableOrderLineState =
                TestBed.inject<ImmutableOrderLineState>(ImmutableOrderLineState);

            // noinspection DuplicatedCode
            expect(state.total).toBe(0);
            expect(state.total).toBe(0);
            expect(state.total).toBe(0);
            expect(state.total).toBe(0);
            expect(state.memoized).toBe(1);

            // noinspection DuplicatedCode
            expect(state.classicTotal).toBe(0);
            expect(state.classicTotal).toBe(0);
            expect(state.classicTotal).toBe(0);
            expect(state.classicTotal).toBe(0);
            expect(state.nonMemoized).toBe(4);

            state.setAmount(5);
            state.setPrice(5);

            // noinspection DuplicatedCode
            expect(state.total).toBe(25);
            expect(state.total).toBe(25);
            expect(state.total).toBe(25);
            expect(state.total).toBe(25);
            expect(state.memoized).toBe(2);

            // noinspection DuplicatedCode
            expect(state.classicTotal).toBe(25);
            expect(state.classicTotal).toBe(25);
            expect(state.classicTotal).toBe(25);
            expect(state.classicTotal).toBe(25);
            expect(state.nonMemoized).toBe(8);
        });
    });

    it('should be correct computed when change other states', () => {
        abstract class AbstractCommonCounter extends NgxsDataRepository<number> {
            @DataAction()
            public increment() {
                this.ctx.setState((state: number) => state + 1);
            }
        }

        @StateRepository()
        @State({
            name: 'a',
            defaults: 0,
        })
        @Injectable()
        class A extends AbstractCommonCounter {}

        @StateRepository()
        @State({
            name: 'b',
            defaults: 0,
        })
        @Injectable()
        class B extends AbstractCommonCounter {}

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([A, B], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);
        const a: A = TestBed.inject<A>(A);
        const b: B = TestBed.inject<B>(B);

        expect(store.snapshot()).toEqual({b: 0, a: 0});
        expect(a.snapshot).toBe(0);
        expect(b.snapshot).toBe(0);

        a.increment();
        a.increment();
        a.increment();
        b.increment();

        expect(store.snapshot()).toEqual({b: 1, a: 3});
        expect(a.snapshot).toBe(3);
        expect(b.snapshot).toBe(1);
    });

    it('should be correct computed when change other states and inherited state', () => {
        @State({
            name: 'commonCounter',
            defaults: 0,
        })
        @Injectable()
        class CommonCounterState extends NgxsDataRepository<number> {
            @DataAction()
            public increment() {
                this.ctx.setState((state: number) => state + 1);
            }
        }

        @StateRepository()
        @State({name: 'a'})
        @Injectable()
        class A extends CommonCounterState {}

        @StateRepository()
        @State({name: 'b'})
        @Injectable()
        class B extends CommonCounterState {}

        // noinspection DuplicatedCode
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([A, B], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        const store: Store = TestBed.inject<Store>(Store);
        const a: A = TestBed.inject<A>(A);
        const b: B = TestBed.inject<B>(B);

        expect(store.snapshot()).toEqual({b: 0, a: 0});
        expect(a.snapshot).toBe(0);
        expect(b.snapshot).toBe(0);

        a.increment();
        a.increment();
        a.increment();
        b.increment();

        expect(store.snapshot()).toEqual({b: 1, a: 3});
        expect(a.snapshot).toBe(3);
        expect(b.snapshot).toBe(1);

        a.reset();
        b.reset();

        b.increment();
        b.increment();
        b.increment();
        a.increment();

        expect(store.snapshot()).toEqual({b: 3, a: 1});
        expect(a.snapshot).toBe(1);
        expect(b.snapshot).toBe(3);
        expect(a.snapshot === a.getState()).toBeTruthy();
        expect(b.snapshot === b.getState()).toBeTruthy();

        a.increment();
        a.increment();
        a.increment();
        a.increment();
        a.increment();
        a.increment();
        b.increment();

        expect(store.snapshot()).toEqual({b: 4, a: 7});
        expect(a.snapshot).toBe(7);
        expect(b.snapshot).toBe(4);
        expect(a.snapshot === a.getState()).toBeTruthy();
        expect(b.snapshot === b.getState()).toBeTruthy();
    });

    it('should be trigger when store changes', () => {
        interface Model {
            value: number;
        }

        @StateRepository()
        @State({
            name: 'b',
            defaults: {value: 2},
        })
        @Injectable()
        class B extends NgxsDataRepository<Model> {}

        @StateRepository()
        @State({
            name: 'a',
            defaults: {value: 1},
        })
        @Injectable()
        class A extends NgxsDataRepository<Model> {
            public heavyCount: number = 0;

            constructor(private readonly b: B) {
                super();
            }

            @Computed()
            public get sum(): number {
                this.heavyCount++;

                return this.snapshot.value + this.b.snapshot.value;
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([A, B], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        });

        const store: Store = TestBed.inject(Store);
        const a: A = TestBed.inject(A);
        const b: B = TestBed.inject(B);
        const stream: NgxsDataSequence = TestBed.inject(NgxsDataSequence);

        expect(stream.sequenceValue).toBe(1);
        expect(store.snapshot()).toEqual({b: {value: 2}, a: {value: 1}});

        expect(a.snapshot).toEqual({value: 1});
        expect(a.snapshot).toEqual(a.snapshot);
        expect(a.snapshot).toEqual(a.snapshot);
        expect(a.snapshot).toEqual(a.snapshot);

        expect(b.snapshot).toEqual({value: 2});
        expect(b.snapshot).toEqual(b.snapshot);
        expect(b.snapshot).toEqual(b.snapshot);
        expect(b.snapshot).toEqual(b.snapshot);

        expect(a.sum).toBe(3);
        expect(a.sum).toBe(3);
        expect(a.sum).toBe(3);
        expect(a.sum).toBe(3);
        expect(a.sum).toBe(3);
        expect(a.sum).toBe(3);
        expect(a.sum).toBe(3);

        expect(a.heavyCount).toBe(1);

        store.reset({a: {value: 5}, b: {value: 10}});

        expect(stream.sequenceValue).toBe(2);
        expect(store.snapshot()).toEqual({b: {value: 10}, a: {value: 5}});

        expect(a.snapshot).toEqual({value: 5});
        expect(a.snapshot).toEqual(a.snapshot);
        expect(a.snapshot).toEqual(a.snapshot);
        expect(a.snapshot).toEqual(a.snapshot);

        expect(b.snapshot).toEqual({value: 10});
        expect(b.snapshot).toEqual(b.snapshot);
        expect(b.snapshot).toEqual(b.snapshot);
        expect(b.snapshot).toEqual(b.snapshot);

        expect(a.sum).toBe(15);
        expect(a.sum).toBe(15);
        expect(a.sum).toBe(15);
        expect(a.sum).toBe(15);
        expect(a.sum).toBe(15);
        expect(a.sum).toBe(15);
        expect(a.sum).toBe(15);

        expect(a.heavyCount).toBe(2);

        stream.ngOnDestroy();
        store.reset({a: {value: 0}, b: {value: 0}});
        expect(stream.sequenceValue).toBe(0);

        store.reset({a: {value: 1}, b: {value: 1}});
        expect(stream.sequenceValue).toBe(0);
    });

    it('does not recalculate when use state from third-party service', () => {
        @Injectable()
        class MyFirstCountService {
            private values$: BehaviorSubject<number> = new BehaviorSubject(0);

            public increment(): void {
                this.values$.next(this.getValue() + 1);
            }

            public getValue(): number {
                // eslint-disable-next-line rxjs/no-subject-value
                return this.values$.getValue();
            }
        }

        @StateRepository()
        @State({
            name: 'count',
            defaults: 0,
        })
        @Injectable()
        class MySecondCountState extends NgxsDataRepository<number> {
            constructor(private readonly first: MyFirstCountService) {
                super();
            }

            @Computed()
            public get sum(): number {
                return this.snapshot + this.first.getValue();
            }

            @DataAction()
            public increment(): void {
                this.ctx.setState((state: number) => state + 1);
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([MySecondCountState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
            providers: [MyFirstCountService],
        });

        const first: MyFirstCountService = TestBed.inject(MyFirstCountService);
        const second: MySecondCountState = TestBed.inject(MySecondCountState);

        expect(first.getValue()).toBe(0);
        expect(second.snapshot).toBe(0);
        expect(second.sum).toBe(0);

        second.increment();
        second.increment();

        expect(first.getValue()).toBe(0);
        expect(second.snapshot).toBe(2);
        expect(second.sum).toBe(2);

        first.increment();
        first.increment();
        first.increment();

        // Expect invalid behavior
        expect(first.getValue()).toBe(3);
        expect(second.snapshot).toBe(2);
        expect(second.sum).toBe(2);
    });

    it('recalculate sum when use state from third-party service', () => {
        @Injectable()
        class MyFirstCountService {
            private values$: BehaviorSubject<number> = new BehaviorSubject(0);

            constructor(private readonly sequence: NgxsDataSequence) {}

            public increment(): void {
                this.values$.next(this.getValue() + 1);
                this.sequence.updateSequence();
            }

            public getValue(): number {
                return this.values$.getValue();
            }
        }

        // noinspection DuplicatedCode
        @StateRepository()
        @State({
            name: 'count',
            defaults: 0,
        })
        @Injectable()
        class MySecondCountState extends NgxsDataRepository<number> {
            constructor(private readonly first: MyFirstCountService) {
                super();
            }

            @Computed()
            public get sum(): number {
                return this.snapshot + this.first.getValue();
            }

            @DataAction()
            public increment(): void {
                this.ctx.setState((state: number) => state + 1);
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([MySecondCountState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
            providers: [MyFirstCountService],
        });

        const first: MyFirstCountService = TestBed.inject(MyFirstCountService);
        const second: MySecondCountState = TestBed.inject(MySecondCountState);

        expect(first.getValue()).toBe(0);
        expect(second.snapshot).toBe(0);
        expect(second.sum).toBe(0);

        second.increment();
        second.increment();

        expect(first.getValue()).toBe(0);
        expect(second.snapshot).toBe(2);
        expect(second.sum).toBe(2);

        first.increment();
        first.increment();
        first.increment();

        // Expect valid behavior
        expect(first.getValue()).toBe(3);
        expect(second.snapshot).toBe(2);
        expect(second.sum).toBe(5);
    });
});
