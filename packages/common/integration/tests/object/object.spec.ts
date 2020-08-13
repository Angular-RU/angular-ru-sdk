import {
    firstKey,
    sortByAsc,
    sortByDesc,
    isObject,
    isPlainObject,
    isSimpleObject,
    isGetter
} from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';

describe('[TEST]: Object', () => {
    describe('sorting', () => {
        interface A {
            a: number;
        }

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
});
