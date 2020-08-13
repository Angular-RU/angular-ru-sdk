import {
    $any,
    $cast,
    isNil,
    isNotNil,
    isNumber,
    isString,
    checkValueIsEmpty,
    detectChanges,
    isIE
} from '@angular-ru/common/utils';
import { ChangeDetectorRef } from '@angular/core';

describe('[TEST]: Common utils', () => {
    it('$any/$cast', () => {
        expect(parseInt($any(1) + $cast('2'))).toEqual(12);
    });

    it('is null or undefined', () => {
        expect(isNil(null)).toEqual(true);
        expect(isNil(undefined)).toEqual(true);
        expect(isNil('')).toEqual(false);
        expect(isNil(0)).toEqual(false);
    });

    it('is not null or undefined', () => {
        expect(isNotNil(0)).toEqual(true);
        expect(isNotNil('')).toEqual(true);
        expect(isNotNil(null)).toEqual(false);
        expect(isNotNil(undefined)).toEqual(false);
    });

    it('is number', () => {
        expect(isNumber(0)).toEqual(true);
        expect(isNumber(NaN)).toEqual(true);
        expect(isNumber(Infinity)).toEqual(true);
        expect(isNumber('')).toEqual(false);
        expect(isNumber(null)).toEqual(false);
        expect(isNumber(undefined)).toEqual(false);
    });

    it('is string', () => {
        expect(isString('')).toEqual(true);
        expect(isString(0)).toEqual(false);
        expect(isString(NaN)).toEqual(false);
        expect(isString(Infinity)).toEqual(false);
        expect(isString(null)).toEqual(false);
        expect(isString(undefined)).toEqual(false);
    });

    it('is empty value', () => {
        expect(checkValueIsEmpty(0)).toEqual(false);
        expect(checkValueIsEmpty('x')).toEqual(false);
        expect(checkValueIsEmpty('')).toEqual(true);
        expect(checkValueIsEmpty('null')).toEqual(true);
        expect(checkValueIsEmpty('    ')).toEqual(true);
        expect(checkValueIsEmpty(NaN)).toEqual(true);
        expect(checkValueIsEmpty(undefined)).toEqual(true);
        expect(checkValueIsEmpty(null)).toEqual(true);
    });

    it('detect changes invoked three times', () => {
        let count: number = 0;
        const cd: ChangeDetectorRef = {
            detectChanges() {
                count++;
            }
        } as ChangeDetectorRef;

        detectChanges();
        detectChanges(cd);
        detectChanges(null);
        detectChanges([cd, cd]);

        expect(count).toEqual(3);
    });

    it('isIE', () => {
        expect(isIE('Internet Explorer 9 (MSIE 9.0)')).toEqual(true);
        expect(isIE('Chrome')).toEqual(false);
    });
});
