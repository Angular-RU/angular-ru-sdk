import {
    gaussRound,
    getFractionSeparator,
    half,
    isNumber,
    numberFormat,
    toNumber,
    truncated,
} from '@angular-ru/cdk/number';

describe('[TEST]: Number', () => {
    it('is number', () => {
        expect(isNumber(0)).toBe(true);
        expect(isNumber(NaN)).toBe(true);
        expect(isNumber(Infinity)).toBe(true);
        expect(isNumber('')).toBe(false);
        expect(isNumber(null)).toBe(false);
        expect(isNumber(undefined)).toBe(false);
    });

    describe('to number', () => {
        it('naN', () => {
            expect(toNumber(NaN)).toBeNaN();
            expect(toNumber(Infinity)).toEqual(Infinity);
            expect(toNumber('')).toBeNaN();
            expect(toNumber(null)).toBeNaN();
            expect(toNumber(undefined)).toBeNaN();
        });

        it('should be correct to number', () => {
            expect(toNumber(0)).toBe(0);
            expect(toNumber('0.1')).toBe(0.1);
            expect(toNumber('1123123,123')).toBe(1123123.123);
            expect(toNumber('0,1')).toBe(0.1);
            expect(toNumber('1 000 000')).toBe(1000000);
            expect(toNumber('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16')).toBe(
                1.2345678910111212e22,
            );
        });

        it('correct from custom locale to number', () => {
            expect(toNumber('123.456,79', 'de')).toBe(123456.79);
            expect(toNumber('123,457', 'ru')).toBe(123.457);
            expect(toNumber('1,23,000', 'en-IN')).toBe(123000);
            expect(toNumber('30,000.65', 'en-IN')).toBe(30000.65);
            expect(toNumber('30.000,65', 'de')).toBe(30000.65);
            expect(toNumber('30 000,65', 'ru')).toBe(30000.65);
            expect(toNumber('30 000 000', 'ru')).toBe(30000000);
            expect(toNumber('30 000 000', 'ru')).toBe(30000000);
            expect(toNumber('30 000 000,01', 'ru')).toBe(30000000.01);
            expect(toNumber('30 000 000.01', 'ru')).toBe(30000000.01);
            expect(toNumber('30 000 000.01', 'fr')).toBe(30000000.01);
            expect(toNumber('30.000.000,01', 'de')).toBe(30000000.01);
            expect(toNumber('30,000,000.01', 'en')).toBe(30000000.01);
            expect(toNumber('30,000,000.01', 'en-US')).toBe(30000000.01);
            expect(toNumber('2.13472231235', 'de')).toBe(213472231235);
            expect(toNumber('2.134.722.312.350', 'de')).toBe(2134722312350);
            expect(toNumber('-10000000000.0009', 'en-US')).toEqual(-10000000000.0009);
            expect(toNumber('-10000000000.0009', 'de')).toEqual(-100000000000009);
            expect(toNumber('-10000000000.0009', 'fr')).toEqual(-10000000000.0009);
        });
    });

    it('half', () => {
        expect(half(4)).toBe(2);
        expect(half(2)).toBe(1);
        expect(half(0)).toBe(0);
        expect(half(-2)).toEqual(-1);
        expect(half(1)).toBe(0.5);
        expect(half(-3)).toEqual(-1.5);
        expect(half(-0.5)).toEqual(-0.25);
        expect(half(4.1)).toBe(2.05);
        expect(half(Infinity)).toEqual(Infinity);
        expect(half(-Infinity)).toEqual(-Infinity);
        expect(half(NaN)).toBeNaN();
        expect(half([] as any)).toBeNaN();
        expect(half({} as any)).toBeNaN();
        expect(half(null as any)).toBeNaN();
        expect(half(undefined as any)).toBeNaN();
        expect(half('' as any)).toBeNaN();
    });

    it('truncated', () => {
        expect(truncated(35.874993, 0)).toBe(35);
        expect(truncated(35.874993, 1)).toBe(35.8);
        expect(truncated(35.874993, 2)).toBe(35.87);
        expect(truncated(35.874993, 3)).toBe(35.874);
        expect(truncated(35.874993, 4)).toBe(35.8749);
    });

    it('gaussRound', () => {
        expect(gaussRound(2.5)).toBe(2);
        expect(gaussRound(3.5)).toBe(4);
        expect(gaussRound(2.57, 1)).toBe(2.6);
        expect(gaussRound(1000.879923123, 3)).toBe(1000.88);
        expect(gaussRound(1000.8709923123, 3)).toBe(1000.871);
        expect(gaussRound(1000, 3)).toBe(1000);
        expect(gaussRound(1000.1, 3)).toBe(1000.1);
        expect(gaussRound(1000.12, 3)).toBe(1000.12);
        expect(gaussRound(1000.56, 3)).toBe(1000.56);
        expect(gaussRound(-10000000000.0009, 3)).toEqual(-10000000000.001);
        expect(gaussRound(NaN, 3)).toBeNaN();
    });

    it('getFractionSeparator', () => {
        expect(getFractionSeparator('de-DE')).toBe(',');
        expect(getFractionSeparator('ja-JP')).toBe('.');
        expect(getFractionSeparator('en-IN')).toBe('.');
        expect(getFractionSeparator('ru')).toBe(',');
        expect(getFractionSeparator('en-US')).toBe('.');
    });

    it('numberFormat', () => {
        expect(numberFormat(1500300.5)).toBe('1 500 300,5');
        expect(numberFormat(1500300.5, {formatOptions: {minimumFractionDigits: 2}})).toBe(
            '1 500 300,50',
        );
        expect(
            numberFormat(1500300, {formatOptions: {style: 'currency', currency: 'EUR'}}),
        ).toBe('1 500 300,00 €');
        expect(
            numberFormat(1500300, {
                locales: 'en-US',
                formatOptions: {style: 'currency', currency: 'rub', useGrouping: false},
            }),
        ).toBe('RUB 1500300.00');
        expect(numberFormat(1500300, {formatOptions: {maximumFractionDigits: 0}})).toBe(
            '1 500 300',
        );
        expect(numberFormat(null)).toBe('');
        expect(numberFormat(undefined)).toBe('');
        expect(numberFormat()).toBe('');
        expect(numberFormat(NaN)).toBe('');
    });
});
