import {
    $any,
    $cast,
    isNil,
    isNotNil,
    checkValueIsEmpty,
    serializeXmlToString,
    detectChanges,
    isIE,
    parseXmlFromString,
    checkSomeValueIsEmpty,
    checkEveryValueIsEmpty,
    isAny
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

    it('simple parse xml', () => {
        const xml = parseXmlFromString('<hello>123</hello>');
        expect(xml.querySelector('hello')?.textContent).toEqual('123');
    });

    it('parse nested xml', () => {
        const xml = parseXmlFromString(`
          <root>
            <a>
                <b>1</b>
                <c>2</c>
            </a>
          </root>
        `);

        expect(xml.querySelector('a b')?.textContent).toEqual('1');
        expect(xml.querySelector('c')?.textContent).toEqual('2');
    });

    it('xml to string', () => {
        const xml = parseXmlFromString('<hello>123</hello>');
        expect(serializeXmlToString(xml)).toEqual('<hello>123</hello>');
    });

    it('checkEveryValueIsEmpty should return false for a set of filled values', () =>
        expect(checkEveryValueIsEmpty(42, 'hello world', {})).toEqual(false));

    it('checkEveryValueIsEmpty should return false for a set of values containing filled values', () =>
        expect(checkEveryValueIsEmpty(42, 'hello world', null)).toEqual(false));

    it('checkEveryValueIsEmpty should return false for a set of empty values', () =>
        expect(checkEveryValueIsEmpty('', undefined, null)).toEqual(true));

    it('checkSomeValueIsEmpty should return false for a set of filled values', () =>
        expect(checkSomeValueIsEmpty(42, 'hello world', {})).toEqual(false));

    it('checkSomeValueIsEmpty should return true for a set of values containing empty values', () =>
        expect(checkSomeValueIsEmpty(42, 'hello world', null)).toEqual(true));

    it('checkSomeValueIsEmpty should return true for a set of empty values', () =>
        expect(checkSomeValueIsEmpty('', undefined, null)).toEqual(true));

    it('isAny should return false if all values is null', () => expect(isAny([null, null, null])).toEqual(false));

    it('isAny should return false if all values is undefined', () =>
        expect(isAny([undefined, undefined, undefined])).toEqual(false));

    it('isAny should return false if values either null or undefined', () =>
        expect(isAny([undefined, undefined, null])).toEqual(false));

    it('isAny should return true if there is only one value with type number', () =>
        expect(isAny([42, undefined, null])).toEqual(true));

    it('isAny should return true if there is only one value with type string', () =>
        expect(isAny([undefined, 'hi', null])).toEqual(true));

    it('isAny should return true if there is only one value with type object', () =>
        expect(isAny([undefined, null, {}])).toEqual(true));

    it('isAny should return true if there is more than one value', () => expect(isAny([42, {}, 'hi'])).toEqual(true));
});
