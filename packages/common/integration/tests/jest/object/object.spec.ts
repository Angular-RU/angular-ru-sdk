import {
    checkIsShallowEmpty,
    clean,
    deepClone,
    deepFreeze,
    firstKey,
    getValueByPath,
    isGetter,
    isIterable,
    isObject,
    isPlainObject,
    isSimpleObject,
    shallowMapObject,
    pathsOfObject,
    replaceWithNull,
    sortByAsc,
    sortByDesc
} from '@angular-ru/common/object';
import { Any, Nullable, PlainObject } from '@angular-ru/common/typings';

describe('[TEST]: Object', () => {
    interface A {
        a: number;
    }

    interface Origin {
        a: number;
        b: {
            c: number;
        };
    }

    describe('sorting', () => {
        const objectList: A[] = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: -1 }, { a: 0 }];

        it('sort by asc', () => {
            expect(objectList.slice().sort((a, b) => sortByAsc('a', a, b))).toEqual([
                { a: -1 },
                { a: 0 },
                { a: 1 },
                { a: 2 },
                { a: 3 }
            ]);
        });

        it('sort by desc', () => {
            expect(objectList.slice().sort((a, b) => sortByDesc('a', a, b))).toEqual([
                { a: 3 },
                { a: 2 },
                { a: 1 },
                { a: 0 },
                { a: -1 }
            ]);
        });
    });

    it('should correct return first key', () => {
        expect(firstKey({ a: 1 })).toEqual('a');
        expect(firstKey({ b: 2, a: 1, c: 3 })).toEqual('b');
        expect(firstKey(null)).toEqual(null);
    });

    describe('detect object', () => {
        class A {}

        it('is object', () => {
            expect(isObject(NaN)).toBe(false);
            expect(isObject(null)).toBe(false);
            expect(isObject(undefined)).toBe(false);
            expect(isObject(1)).toBe(false);
            expect(isObject(Infinity)).toBe(false);
            expect(isObject('')).toBe(false);
            // non primitive
            expect(isObject([])).toBe(true);
            expect(isObject({})).toBe(true);
            expect(isObject(new A())).toBe(true);
            expect(isObject(new Date())).toBe(true);
            expect(isObject(new Map())).toBe(true);
            expect(isObject(() => {})).toBe(true);
            // noinspection JSPrimitiveTypeWrapperUsage
            expect(isObject(new Number(6))).toBe(true);
            expect(isObject(Math)).toBe(true);
            expect(isObject(Object.create(null))).toBe(true);
            expect(isObject(document.createElement('div'))).toBe(true);
            // @ts-ignore
            expect(isObject(new (function Foo() {})())).toBe(true);
            expect(isObject(window)).toBe(true);
        });

        it('is plain object', () => {
            expect(isPlainObject(NaN)).toBe(false);
            expect(isPlainObject(null)).toBe(false);
            expect(isPlainObject(undefined)).toBe(false);
            expect(isPlainObject(1)).toBe(false);
            expect(isPlainObject(Infinity)).toBe(false);
            expect(isPlainObject('')).toBe(false);
            // plain object
            expect(isPlainObject({})).toBe(true);
            expect(isPlainObject(Object.create(null))).toBe(true);
            // complex object (not plain literal)
            expect(isPlainObject([])).toBe(false);
            expect(isPlainObject(new A())).toBe(false);
            expect(isPlainObject(new Date())).toBe(false);
            expect(isPlainObject(new Map())).toBe(false);
            expect(isPlainObject(() => {})).toBe(false);
            // noinspection JSPrimitiveTypeWrapperUsage
            expect(isPlainObject(new Number(6))).toBe(false);
            expect(isPlainObject(Math)).toBe(false);
            expect(isPlainObject(document.createElement('div'))).toBe(false);
            // @ts-ignore
            expect(isPlainObject(new (function Foo() {})())).toBe(false);
        });

        it('is simple object', () => {
            expect(isSimpleObject(NaN)).toBe(false);
            expect(isSimpleObject(null)).toBe(false);
            expect(isSimpleObject(undefined)).toBe(false);
            expect(isSimpleObject(1)).toBe(false);
            expect(isSimpleObject(Infinity)).toBe(false);
            expect(isSimpleObject('')).toBe(false);
            // instance object, literal object
            expect(isSimpleObject(new A())).toBe(true);
            expect(isSimpleObject(Object.create(null))).toBe(true);
            expect(isSimpleObject({})).toBe(true);
            // @ts-ignore
            expect(isSimpleObject(new (function Foo() {})())).toBe(true);
            // complex object (Array, DOM, Set, Map, other structure)
            expect(isSimpleObject([])).toBe(false);
            expect(isSimpleObject(new Date())).toBe(false);
            expect(isSimpleObject(new Map())).toBe(false);
            expect(isSimpleObject(() => {})).toBe(false);
            // noinspection JSPrimitiveTypeWrapperUsage
            expect(isSimpleObject(new Number(6))).toBe(false);
            expect(isSimpleObject(Math)).toBe(false);
            expect(isSimpleObject(document.createElement('div'))).toBe(false);
        });
    });

    describe('getter', () => {
        it('is getter', () => {
            class A {
                public get a(): number {
                    return 1;
                }

                public b: string = '2';
            }

            expect(isGetter(new A(), 'a')).toEqual(true);
            expect(isGetter(new A(), 'b')).toEqual(false);

            expect(
                isGetter(
                    {
                        get a() {
                            return 2;
                        }
                    },
                    'a'
                )
            ).toEqual(true);

            expect(
                isGetter(
                    {
                        _a: null,
                        set a(value: Any) {
                            this._a = value;
                        }
                    },
                    'a'
                )
            ).toEqual(false);

            expect(isGetter({ a: 2 }, 'a')).toEqual(false);
        });

        it('inheritance getter', () => {
            class Base {
                public get base(): string {
                    return 'base';
                }
            }

            class A extends Base {}

            expect(new A().base).toEqual('base');
            expect(isGetter(new A(), 'base')).toEqual(true);

            class Z {
                get base() {
                    return 'base';
                }
            }

            class R extends Z {}

            const r = new R();
            Object.defineProperty(r, 'base', { value: 'joke' });

            expect(r.base).toEqual('joke');
            expect(isGetter(r, 'base')).toEqual(false);
        });

        it('correct check invalid', () => {
            expect(isGetter(null, 'a')).toEqual(false);
            expect(isGetter({}, 'a')).toEqual(false);
            expect(isGetter(Infinity, 'a')).toEqual(false);
            expect(isGetter(undefined, 'a')).toEqual(false);
            expect(isGetter(NaN, 'a')).toEqual(false);
            expect(isGetter(5, 'a')).toEqual(false);
            expect(isGetter(Number(5), 'a')).toEqual(false);
            expect(isGetter(String(5), 'a')).toEqual(false);
        });
    });

    describe('clone', () => {
        it('deep clone', () => {
            const origin: Origin = { a: 1, b: { c: 2 } };
            const copy: Origin = deepClone(origin) as Origin;
            expect(Object.is(origin, copy)).toEqual(false);

            copy.b.c = 4;
            expect(origin.b.c).toEqual(2);

            origin.b.c = 3;
            expect(origin.b.c).toEqual(3);
            expect(copy.b.c).toEqual(4);
        });

        it('not equals', () => {
            const c = { d: 3 };
            const a = { a: 1, b: 2, c };

            expect(deepClone(a).c !== c).toBeTruthy();
            expect(deepClone(a).c).toEqual({ d: 3 });
        });

        it('copy null/NaN/undefined/0/Infinity', () => {
            expect(deepClone(0)).toEqual(0);
            expect(deepClone(NaN)).toEqual(null);
            expect(deepClone(Infinity)).toEqual(null);
            expect(deepClone(null)).toEqual(null);
            expect(deepClone(undefined)).toEqual(undefined);
        });

        it('should be correct clone object', () => {
            class Mock {
                public a: string = null!;
                public b: object[] = [{ c: 1, d: 2 }];
                public e: number = NaN;
                public f: number = Infinity;
                public g: Date | string = new Date(2018, 10, 28);
            }

            expect(deepClone(new Mock())).toEqual({
                a: null,
                b: [{ c: 1, d: 2 }],
                e: null,
                f: null,
                g: expect.any(String)
            });
        });
    });

    describe('freeze', () => {
        it('deep freeze', () => {
            const origin: Origin = deepFreeze({ a: 1, b: { c: 2 } });
            let message: Nullable<string> = null;

            try {
                origin.b.c = 5;
            } catch (e) {
                message = e.message;
            }

            expect(message).toEqual(`Cannot assign to read only property 'c' of object '[object Object]'`);
        });
    });

    it('should be correct object', (): void => {
        const wrongElem: PlainObject = {
            a: '',
            b: [
                { c: NaN, d: 1 },
                { c: '   ', d: undefined },
                { c: 0, d: 0 }
            ],
            e: Infinity
        };

        expect(replaceWithNull(wrongElem)).toEqual({
            a: null,
            b: [
                { c: null, d: 1 },
                { c: null, d: null },
                { c: 0, d: 0 }
            ],
            e: null
        });
    });

    it('should be clear empty values', (): void => {
        const A: PlainObject = clean({
            a: 1,
            b: undefined,
            c: '',
            d: null,
            e: NaN,
            f: [
                {
                    a: 2,
                    b: undefined,
                    c: '',
                    d: Infinity
                },
                {
                    a: 3,
                    b: undefined,
                    c: '',
                    d: Infinity
                }
            ],
            g: {
                a: 4,
                b: undefined,
                c: '',
                d: Infinity
            },
            h: Infinity
        });

        const B: PlainObject = { a: 1, f: [{ a: 2 }, { a: 3 }], g: { a: 4 } };

        expect(A).toEqual(B);
    });

    it('getValueByPath', () => {
        const obj: PlainObject = { a: 1, f: [{ a: 2 }, { a: 3 }], g: { a: 4 } };

        expect(getValueByPath(null, '')).toEqual(null);
        expect(getValueByPath({ a: 2 }, '')).toEqual({ a: 2 });
        expect(getValueByPath(null, 'ge')).toEqual(undefined);
        expect(getValueByPath(undefined, 'ge')).toEqual(undefined);
        expect(getValueByPath(obj, 'ge')).toEqual(undefined);
        expect(getValueByPath(obj, 'g.a')).toEqual(4);
        expect(getValueByPath(obj, 'f.0')).toEqual({ a: 2 });
        expect(getValueByPath(obj, 'f.0.a')).toEqual(2);
        expect(getValueByPath(obj, 'abc')).toEqual(undefined);
        expect(getValueByPath(obj, 'f.0.a.Z', [])).toEqual([]);
    });

    it('checkIsShallowEmpty', () => {
        expect(checkIsShallowEmpty({ a: 0 })).toEqual(false);
        expect(checkIsShallowEmpty({ a: { b: '' } })).toEqual(false);
        expect(checkIsShallowEmpty({ a: 'hello' })).toEqual(false);
        // shallow empty object
        expect(checkIsShallowEmpty({})).toEqual(true);
        expect(checkIsShallowEmpty({ a: null })).toEqual(true);
        expect(checkIsShallowEmpty({ a: '', b: undefined, c: NaN, d: '   ' })).toEqual(true);
    });

    it('should correct recognize iterable values', function () {
        expect(isIterable([1, 2])).toBe(true);
        expect(isIterable('Some String')).toBe(true);
        expect(isIterable(new Set([1, 2]))).toBe(true);
        expect(
            isIterable(
                new Map([
                    ['a', 1],
                    ['b', 2]
                ])
            )
        ).toBe(true);
        expect(
            isIterable(
                new Map([
                    ['a', 1],
                    ['b', 2]
                ]).entries()
            )
        ).toBe(true);
        expect(isIterable({ a: 1, b: 2 })).toBe(false);
        expect(isIterable(null)).toBe(false);
        expect(isIterable(undefined)).toBe(false);
        expect(isIterable(0)).toBe(false);
        expect(isIterable(true)).toBe(false);
        expect(isIterable(() => {})).toBe(false);
    });

    it('should correct return paths of object', () => {
        const row: PlainObject = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                },
                g: [1, 2, 3]
            }
        };

        expect(pathsOfObject(row)).toEqual(['a', 'b.c', 'b.d.e', 'b.g']);

        class Person {
            constructor(public name: string, public city: string) {}
        }

        // @ts-ignore
        Person.prototype['age'] = 25;
        const willem: Person = new Person('Willem', 'Groningen');

        expect(pathsOfObject(willem)).toEqual(['name', 'city']);
    });

    it('should correct map objects by keys', function () {
        const oneTypeObject = { a: 1, b: 3, c: 5 };
        expect(shallowMapObject(oneTypeObject, (a: number): number => a * 2)).toEqual({ a: 2, b: 6, c: 10 });

        const baseTypeObject = { a: '1 asd', b: 3, c: true };
        expect(
            shallowMapObject(baseTypeObject, (a: number | string | boolean): string => `${a} - interpolated`)
        ).toEqual({
            a: '1 asd - interpolated',
            b: '3 - interpolated',
            c: `true - interpolated`
        });

        const complexObject = { a: 1, b: 'two', c: true, d: undefined, e: null, f: { field: 'value' }, g: [1, 2, 3] };
        expect(shallowMapObject(complexObject, (a): string => JSON.stringify(a))).toEqual({
            a: '1',
            b: '"two"',
            c: 'true',
            d: undefined,
            e: 'null',
            f: '{"field":"value"}',
            g: '[1,2,3]'
        });
    });
});
