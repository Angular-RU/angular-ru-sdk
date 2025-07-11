import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
import {Computed, DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';
import {provideStore, State} from '@ngxs/store';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

describe('[TEST]: Observable with computed $a field', () => {
    let a: A;
    let b: B;
    let subResult: string[] = [];
    let ref1: Subscription | null = null;
    let ref2: Subscription | null = null;
    let ref3: Subscription | null = null;
    let ref4: Subscription | null = null;
    let ref5: Subscription | null = null;

    interface Model {
        value: number;
    }

    @StateRepository()
    @State<Model>({
        name: 'b',
        defaults: {value: 2},
    })
    @Injectable()
    class B extends NgxsDataRepository<Model> {
        @Computed()
        public get value(): number {
            return this.getState().value;
        }

        @DataAction()
        public increment(): void {
            this.ctx.setState((state: Model) => ({value: state.value + 1}));
        }
    }

    @StateRepository()
    @State<Model>({
        name: 'a',
        defaults: {value: 1},
    })
    @Injectable()
    class A extends NgxsDataRepository<Model> {
        public subscribeA$ = 0;
        public subscribeA$_$B = 0;

        constructor(private readonly _b: B) {
            super();
        }

        @Computed()
        public get value(): number {
            return this.getState().value;
        }

        @Computed()
        public get a$(): Observable<string> {
            this.subscribeA$++;

            return this.state$.pipe(
                map((value): string => {
                    const aX = value.value;
                    const bX = this._b.snapshot.value;

                    return `a(${aX}) + b(${bX}) = ${aX + bX}`;
                }),
            );
        }

        @Computed()
        public get aWithB$(): Observable<string> {
            this.subscribeA$_$B++;

            return combineLatest([this.state$, this._b.state$] as Array<
                Observable<Model>
            >).pipe(
                map(
                    ([_a, _b]): string =>
                        `a(${_a?.value}) + b(${_b?.value}) = ${(_a?.value ?? 0) + (_b?.value ?? 0)}`,
                ),
            );
        }

        @DataAction()
        public increment(): void {
            this.ctx.setState((state: Model) => ({value: state.value + 1}));
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideStore([A, B], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
        });

        a = TestBed.inject(A);
        b = TestBed.inject(B);
        subResult = [];

        ref1 = null;
        ref2 = null;
        ref3 = null;
        ref4 = null;
        ref5 = null;
    });

    it('should be trigger when $a state changed', () => {
        expect(a.snapshot).toEqual({value: 1});
        expect(b.snapshot).toEqual({value: 2});

        subResult.push('subscribe ref#1');
        ref1 = a.a$.subscribe((value) => subResult.push(`ref#1: ${value}`));

        subResult.push('subscribe ref#2');
        ref2 = a.a$.subscribe((value) => subResult.push(`ref#2: ${value}`));

        a.increment();
        subResult.push(`a.incremented ${a.value}`);

        a.increment();
        subResult.push(`a.incremented ${a.value}`);

        expect(a.snapshot).toEqual({value: 3});
        expect(b.snapshot).toEqual({value: 2});

        subResult.push('subscribe ref#3');
        ref3 = a.a$.subscribe((value) => subResult.push(`ref#3: ${value}`));

        subResult.push('subscribe ref#4');
        ref4 = a.a$.subscribe((value) => subResult.push(`ref#4: ${value}`));

        b.increment();
        subResult.push(`b.incremented ${b.value}`);

        b.increment();
        subResult.push(`b.incremented ${b.value}`);

        expect(a.snapshot).toEqual({value: 3});
        expect(b.snapshot).toEqual({value: 4});

        ref1.unsubscribe();
        subResult.push('ref#1 unsubscribe');

        ref2.unsubscribe();
        subResult.push('ref#2 unsubscribe');

        a.increment();
        subResult.push(`a.incremented ${a.value}`);

        b.increment();
        subResult.push(`b.incremented ${b.value}`, 'subscribe ref#5');
        ref5 = a.a$.subscribe((value) => subResult.push(`ref#5: ${value}`));

        expect(ref1.closed).toBe(true);
        expect(ref2.closed).toBe(true);
        expect(ref3.closed).toBe(false);
        expect(ref4.closed).toBe(false);
        expect(ref5.closed).toBe(false);

        expect(a.snapshot).toEqual({value: 4});
        expect(b.snapshot).toEqual({value: 5});

        expect(subResult).toEqual([
            'subscribe ref#1',
            'ref#1: a(1) + b(2) = 3',
            'subscribe ref#2',
            'ref#2: a(1) + b(2) = 3',
            'ref#1: a(2) + b(2) = 4',
            'ref#2: a(2) + b(2) = 4',
            'a.incremented 2',
            'ref#1: a(3) + b(2) = 5',
            'ref#2: a(3) + b(2) = 5',
            'a.incremented 3',
            'subscribe ref#3',
            'ref#3: a(3) + b(2) = 5',
            'subscribe ref#4',
            'ref#4: a(3) + b(2) = 5',
            'b.incremented 3',
            'b.incremented 4',
            'ref#1 unsubscribe',
            'ref#2 unsubscribe',
            'ref#3: a(4) + b(4) = 8',
            'ref#4: a(4) + b(4) = 8',
            'a.incremented 4',
            'b.incremented 5',
            'subscribe ref#5',
            'ref#5: a(4) + b(5) = 9',
        ]);

        expect(a.subscribeA$).toBe(1);
    });

    it('should be trigger only when $a and $b states changed', () => {
        expect(a.snapshot).toEqual({value: 1});
        expect(b.snapshot).toEqual({value: 2});

        subResult.push('subscribe ref#1');
        ref1 = a.aWithB$.subscribe((value) => subResult.push(`ref#1: ${value}`));

        subResult.push('subscribe ref#2');
        ref2 = a.aWithB$.subscribe((value) => subResult.push(`ref#2: ${value}`));

        a.increment();
        subResult.push(`a.incremented ${a.value}`);

        a.increment();
        subResult.push(`a.incremented ${a.value}`);

        expect(a.snapshot).toEqual({value: 3});
        expect(b.snapshot).toEqual({value: 2});

        subResult.push('subscribe ref#3');
        ref3 = a.aWithB$.subscribe((value) => subResult.push(`ref#3: ${value}`));

        subResult.push('subscribe ref#4');
        ref4 = a.aWithB$.subscribe((value) => subResult.push(`ref#4: ${value}`));

        b.increment();
        subResult.push(`b.incremented ${b.value}`);

        b.increment();
        subResult.push(`b.incremented ${b.value}`);

        expect(a.snapshot).toEqual({value: 3});
        expect(b.snapshot).toEqual({value: 4});

        ref1.unsubscribe();
        subResult.push('ref#1 unsubscribe');

        ref2.unsubscribe();
        subResult.push('ref#2 unsubscribe');

        a.increment();
        subResult.push(`a.incremented ${a.value}`);

        b.increment();
        subResult.push(`b.incremented ${b.value}`, 'subscribe ref#5');
        ref5 = a.a$.subscribe((value) => subResult.push(`ref#5: ${value}`));

        expect(subResult).toEqual([
            'subscribe ref#1',
            'ref#1: a(1) + b(2) = 3',
            'subscribe ref#2',
            'ref#2: a(1) + b(2) = 3',
            'ref#1: a(2) + b(2) = 4',
            'ref#2: a(2) + b(2) = 4',
            'a.incremented 2',
            'ref#1: a(3) + b(2) = 5',
            'ref#2: a(3) + b(2) = 5',
            'a.incremented 3',
            'subscribe ref#3',
            'ref#3: a(3) + b(2) = 5',
            'subscribe ref#4',
            'ref#4: a(3) + b(2) = 5',
            'ref#1: a(3) + b(3) = 6',
            'ref#2: a(3) + b(3) = 6',
            'ref#3: a(3) + b(3) = 6',
            'ref#4: a(3) + b(3) = 6',
            'b.incremented 3',
            'ref#1: a(3) + b(4) = 7',
            'ref#2: a(3) + b(4) = 7',
            'ref#3: a(3) + b(4) = 7',
            'ref#4: a(3) + b(4) = 7',
            'b.incremented 4',
            'ref#1 unsubscribe',
            'ref#2 unsubscribe',
            'ref#3: a(4) + b(4) = 8',
            'ref#4: a(4) + b(4) = 8',
            'a.incremented 4',
            'ref#3: a(4) + b(5) = 9',
            'ref#4: a(4) + b(5) = 9',
            'b.incremented 5',
            'subscribe ref#5',
            'ref#5: a(4) + b(5) = 9',
        ]);

        expect(a.subscribeA$_$B).toBe(1);
    });
});
