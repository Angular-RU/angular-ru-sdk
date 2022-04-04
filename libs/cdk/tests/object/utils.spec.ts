import { equals, flatten, objectToString, shallowTrimProperties, strictEquals } from '@angular-ru/cdk/object';
import { PlainObject } from '@angular-ru/cdk/typings';

describe('[TEST]: Correct work object utils', (): void => {
    it('should be object A equals object B', (): void => {
        const A: PlainObject = { a: 1, b: [1, 2] };
        const B: PlainObject = { a: 1, b: [1, 2] };

        expect(equals(A, B)).toBe(true);
    });

    it('should be not equals A and B when shallow comparison unsorted keys', (): void => {
        const A: PlainObject = { a: 1, c: { e: 2, d: 1 }, b: [1, 2] };
        const B: PlainObject = { b: [1, 2], a: 1, c: { d: 1, e: 2 } };

        expect(equals(A, B)).toBe(false);
    });

    it('should be not equals A and B when deep comparison unsorted keys', (): void => {
        const A: PlainObject = { a: 1, c: { e: 2, d: 1 }, b: [1, 2] };
        const B: PlainObject = { b: [1, 2], a: 1, c: { d: 1, e: 2 } };
        const D: PlainObject = { a: 1, b: 2, c: [{ e: 2, d: 1 }] };
        const E: PlainObject = { a: 1, b: 2, c: [{ d: 1, e: 2 }] };

        expect(equals(A, B, { deep: true })).toBe(true);
        expect(equals(D, E, { deep: true })).toBe(true);
    });

    it('should be return true for equals primitive types', (): void => {
        expect(equals(null!, null!)).toBe(true);
        expect(equals(undefined!, undefined!)).toBe(true);
        expect(equals(NaN as NaN as any)).toBe(true);
        expect(equals(Infinity as Infinity as any)).toBe(true);
        expect(equals('' as '' as any)).toBe(true);
        expect(equals(1 as 1 as any)).toBe(true);

        expect(equals('1' as 1 as any)).toBe(false);
        expect(equals(null!, undefined!)).toBe(false);
        expect(equals(NaN as !undefined, { deep: true })).toBe(false);
    });

    it('should be a proper comparison with a weak and strict type', (): void => {
        expect(equals({ a: '1' }, { a: 1 })).toBe(false);
        expect(equals({ a: '1' }, { a: 1 }, { weekType: true })).toBe(true);
    });

    it('should be correct work objectToString', (): void => {
        expect(objectToString(1 as any)).toBe('1');
        expect(objectToString('1' as any)).toBe('"1"');
        expect(objectToString(null!)).toBe('null');
        expect(objectToString(undefined!)).toBeUndefined();

        expect(objectToString({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');

        expect(objectToString([{ b: 2, a: 1 }])).toBe('[{"b":2,"a":1}]');

        expect(objectToString([{ b: 2, a: 1 }], { deep: true })).toBe('[{"a":1,"b":2}]');

        expect(objectToString({ a: 1, b: 2, c: [{ e: 2, d: 1 }] })).toBe('{"a":1,"b":2,"c":[{"e":2,"d":1}]}');

        expect(objectToString({ a: 1, b: 2, c: [{ e: 2, d: 1 }] }, { deep: true })).toBe(
            '{"a":1,"b":2,"c":[{"d":1,"e":2}]}'
        );
    });

    it('should be correct flatten object', (): void => {
        const actual: PlainObject = {
            a: {
                b: 1,
                c: {
                    d: 2
                },
                d: [{ e: 3 }, { f: 4 }]
            },
            g: 5
        };

        const expected: PlainObject = { 'a.b': 1, 'a.c.d': 2, 'a.d.0.e': 3, 'a.d.1.f': 4, g: 5 };

        expect(flatten<number>(actual)).toEqual(expected);
    });

    it('should be correct deep equals with week type', (): void => {
        expect(
            strictEquals(
                {
                    a: 1,
                    b: 2,
                    c: { d: { f: { g: 'd' } } }
                },
                {
                    a: 1,
                    b: 2,
                    c: { d: { f: { g: 'i' } } }
                }
            )
        ).toBe(false);

        expect(
            strictEquals(
                {
                    a: null,
                    b: undefined,
                    c: NaN
                },
                {
                    a: null,
                    b: null,
                    c: null
                }
            )
        ).toBe(true);

        expect(
            strictEquals(
                {
                    a: null,
                    b: undefined
                },
                {
                    a: null,
                    b: null,
                    c: null
                }
            )
        ).toBe(false);
    });

    it('should be shallowTrimProperties', () => {
        expect(
            shallowTrimProperties({
                a: '  ',
                b: ' 0001 ',
                d: { a: '   ' }
            })
        ).toEqual({
            a: '',
            b: '0001',
            d: { a: '   ' }
        });
    });
});
