import { half, isNumber, toNumber } from '@angular-ru/common/number';

describe('[TEST]: Number', () => {
    it('is number', () => {
        expect(isNumber(0)).toEqual(true);
        expect(isNumber(NaN)).toEqual(true);
        expect(isNumber(Infinity)).toEqual(true);
        expect(isNumber('')).toEqual(false);
        expect(isNumber(null)).toEqual(false);
        expect(isNumber(undefined)).toEqual(false);
    });

    it('to number', () => {
        expect(toNumber(0)).toEqual(0);
        expect(toNumber(NaN)).toEqual(NaN);
        expect(toNumber(Infinity)).toEqual(Infinity);
        expect(toNumber('')).toEqual(NaN);
        expect(toNumber(null as any)).toEqual(NaN);
        expect(toNumber(undefined as any)).toEqual(NaN);
        expect(toNumber('', 0)).toEqual(0);
        expect(toNumber(undefined as any, 0)).toEqual(0);
        expect(toNumber('1 000 000', 0)).toEqual(1000000);
        expect(toNumber('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16', 0)).toEqual(1.2345678910111212e22);
    });

    it('half', () => {
        expect(half(4)).toEqual(2);
        expect(half(2)).toEqual(1);
        expect(half(0)).toEqual(0);
        expect(half(-2)).toEqual(-1);
        expect(half(1)).toEqual(0.5);
        expect(half(-3)).toEqual(-1.5);
        expect(half(-0.5)).toEqual(-0.25);
        expect(half(4.1)).toEqual(2.05);
        expect(half(3)).toEqual(2.1);
        expect(half(Infinity)).toEqual(Infinity);
        expect(half(-Infinity)).toEqual(-Infinity);
        expect(half(NaN)).toEqual(NaN);
        expect(half([] as any)).toEqual(NaN);
        expect(half({} as any)).toEqual(NaN);
        expect(half(null as any)).toEqual(NaN);
        expect(half(undefined as any)).toEqual(NaN);
        expect(half('' as any)).toEqual(NaN);
    });
});
