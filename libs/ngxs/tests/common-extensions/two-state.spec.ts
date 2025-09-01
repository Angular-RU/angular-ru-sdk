import {inject, Injectable} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {provideStore, State, Store} from '@ngxs/store';
import {forkJoin, isObservable, Observable, of} from 'rxjs';
import {delay, finalize, map, tap} from 'rxjs/operators';

describe('correct behavior NGXS DATA with Count, Todo states', () => {
    let store: Store;
    let count: CountState;
    let todo: TodoState;

    @Injectable()
    class ApiService {
        public getData(): Observable<number> {
            return of(20).pipe(delay(2000));
        }
    }

    @StateRepository()
    @State({
        name: 'count',
        defaults: 0,
    })
    @Injectable()
    class CountState extends NgxsImmutableDataRepository<number> {
        private readonly api = inject(ApiService);

        @DataAction()
        public increment(): void {
            this.ctx.setState((state) => state + 1);
        }

        @DataAction()
        public asyncSetStateAction(): Observable<number> {
            return this.api.getData().pipe(
                tap((value: number) => {
                    this.ctx.setState(value);
                }),
            );
        }

        @DataAction()
        public asyncIncrementAction(): Observable<number> {
            return this.api.getData().pipe(
                tap((value: number) => {
                    this.ctx.setState((state: number) => state + value);
                }),
                map(() => this.ctx.getState() + 100),
            );
        }

        public incorrectReturnedValue(value: number): void {
            this.ctx.setState(value);
        }

        public setValue(value: number): void {
            this.setState(value);
        }

        public asyncSetState(): Observable<number> {
            return this.api.getData().pipe(
                tap((value: number) => {
                    this.ctx.setState(value);
                }),
            );
        }

        public asyncIncrement(): Observable<number> {
            return this.api.getData().pipe(
                tap((value: number) => {
                    this.ctx.setState((state: number) => state + value);
                }),
                map(() => this.ctx.getState() + 100),
            );
        }
    }

    @Injectable()
    @StateRepository()
    @State<string[]>({
        name: 'todos',
        defaults: [],
    })
    class TodoState extends NgxsImmutableDataRepository<string[]> {
        private readonly counter = inject(CountState);

        @DataAction()
        public add(value: string): TodoState {
            this.ctx.setState((state) => state.concat(value));
            this.counter.increment();

            return this;
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideStore([CountState, TodoState], {developmentMode: true}),
                provideNgxsDataPlugin(),
                ApiService,
            ],
        });

        count = TestBed.inject<CountState>(CountState);
        store = TestBed.inject<Store>(Store);
        todo = TestBed.inject<TodoState>(TodoState);
    });

    it('should be identify non-obvious behavior', () => {
        count.setValue(5);

        expect(count.getState()).toBe(5);
        expect(store.snapshot()).toEqual({todos: [], count: 5});

        count.incorrectReturnedValue(15);

        expect(count.getState()).toBe(15);
        expect(store.snapshot()).toEqual({todos: [], count: 15});
    });

    it('should be correct injectable state', () => {
        expect(store.snapshot()).toEqual({todos: [], count: 0});

        todo.add('A').add('B').add('C');

        expect(store.snapshot()).toEqual(store.snapshot());

        todo.reset();
        count.reset();

        expect(store.snapshot()).toEqual({todos: [], count: 0});
    });

    it('should be correct async method with subscribe', fakeAsync(() => {
        let result: number | null = null;
        let finalized: boolean | null = null;

        count
            .asyncSetState()
            .pipe(
                finalize(() => {
                    finalized = true;
                }),
            )
            .subscribe((response: number) => {
                result = response;
            });

        tick(2000);

        expect(result).toBe(20);
        expect(finalized).toBe(true);
        expect(count.getState()).toBe(20);

        finalized = false;

        count
            .asyncIncrement()
            .pipe(
                finalize(() => {
                    finalized = true;
                }),
            )
            .subscribe((response: number) => {
                result = response;
            });

        tick(2000);

        expect(result).toBe(140);
        expect(finalized).toBe(true);
        expect(count.getState()).toBe(40);
    }));

    it('should be correct async method without subscribe', fakeAsync(() => {
        const result: number | null = null;
        let finalized: boolean | null = null;

        // eslint-disable-next-line rxjs/no-ignored-observable
        count.asyncSetState().pipe(
            finalize(() => {
                finalized = true;
            }),
        );

        tick(2000);

        expect(result).toBeNull();
        expect(finalized).toBeNull();
        expect(count.getState()).toBe(0);
    }));

    it('should be correct async action', fakeAsync(() => {
        let result: number | null = null;
        let finalized: boolean | null = null;

        expect(count.getState()).toBe(0);
        expect(isObservable(count.asyncSetStateAction())).toBe(true);

        tick(2000);

        expect(result).toBeNull();
        expect(finalized).toBeNull();
        expect(count.getState()).toBe(20);

        // eslint-disable-next-line rxjs/no-ignored-observable
        count.asyncSetStateAction();

        // eslint-disable-next-line rxjs/no-ignored-observable
        count.asyncSetStateAction();

        // eslint-disable-next-line rxjs/no-ignored-observable
        count.asyncSetStateAction();

        expect(result).toBeNull();
        expect(finalized).toBeNull();
        expect(count.getState()).toBe(20);

        count
            .asyncSetStateAction()
            .pipe(
                finalize(() => {
                    finalized = true;
                }),
            )
            .subscribe((response: number) => {
                result = response;
            });

        tick(2000);

        expect(result).toBe(20);
        expect(finalized).toBe(true);
        expect(count.getState()).toBe(20);
    }));

    it('should be correct async increment action', fakeAsync(() => {
        let result: number | null = null;
        let finalized: boolean | null = null;

        expect(count.getState()).toBe(0);
        expect(isObservable(count.asyncIncrementAction())).toBe(true);

        tick(1000);

        expect(result).toBeNull();
        expect(finalized).toBeNull();
        expect(count.getState()).toBe(0);

        // eslint-disable-next-line rxjs/no-ignored-observable
        count.asyncIncrementAction();

        // eslint-disable-next-line rxjs/no-ignored-observable
        count.asyncIncrementAction();

        // eslint-disable-next-line rxjs/no-ignored-observable
        count.asyncIncrementAction();

        expect(result).toBeNull();
        expect(finalized).toBeNull();
        expect(count.getState()).toBe(0);

        count
            .asyncIncrementAction()
            .pipe(
                finalize(() => {
                    finalized = true;
                }),
            )
            .subscribe((response: number) => {
                result = response;
            });

        tick(2000);

        expect(result).toBe(140);
        expect(finalized).toBe(true);
        expect(count.getState()).toBe(40);
    }));

    it('should be correct forkJoin', fakeAsync(() => {
        let responseResult: [] | [number, number] = [];
        let result: [] | [number, number] = [];

        // eslint-disable-next-line rxjs/no-ignored-observable
        forkJoin([count.asyncSetStateAction(), count.asyncIncrementAction()]).pipe(
            tap((value) => {
                result = value;
            }),
        );

        tick(2000);

        expect(count.getState()).toBe(40);
        expect(result).toEqual([]);

        forkJoin([count.asyncSetStateAction(), count.asyncIncrementAction()])
            .pipe(
                tap((value) => {
                    result = value;
                }),
            )
            .subscribe((response) => {
                responseResult = response;
            });

        tick(2000);

        expect(count.getState()).toBe(40);
        expect(result).toEqual([20, 140]);
        expect(responseResult).toEqual([20, 140]);
    }));
});
