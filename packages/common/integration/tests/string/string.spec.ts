import {
    capitalize,
    generateQuickGuid,
    getByteSize,
    getLastSymbol,
    isString,
    removeLastSymbol,
    splitOnUniqueValues,
    stringify,
    toStringVal,
    trim
} from '@angular-ru/common/string';
import { getFirstSymbol } from '../../../string/src/get-first-symbol';

describe('[TEST]: String', () => {
    it('toString', () => {
        expect(toStringVal([1, 2, 3])).toEqual('1,2,3');
        expect(toStringVal([1, 2, 3], {} as any)).toEqual('1,2,3');
        expect(toStringVal([1, 2, 3], (value: number[]) => value.join('; '))).toEqual('1; 2; 3');
    });

    it('get byte size', () => {
        expect(getByteSize('сын')).toEqual(6);
        expect(getByteSize('son')).toEqual(3);
    });

    it('stringify', () => {
        expect(stringify({ a: 1, b: { c: 2 } })).toEqual(
            `{
    "a": 1,
    "b": {
        "c": 2
    }
}`
        );

        expect(stringify(1)).toEqual('1');
        expect(stringify(null)).toEqual('null');
        expect(stringify(NaN)).toEqual('null');
        expect(stringify(Infinity)).toEqual('null');
        expect(stringify(undefined)).toEqual('undefined');
    });

    it('capitalize', () => {
        expect(capitalize('hello world')).toEqual('Hello world');
    });

    it('splitOnUniqueValues', () => {
        expect(splitOnUniqueValues(null)).toEqual([]);
        expect(splitOnUniqueValues('1; 2; 3, 5.6;   ;, ; 3, 6, 2; 1; -52; 0')).toEqual([
            '1',
            '2',
            '3',
            '5.6',
            '6',
            '-52',
            '0'
        ]);

        expect(splitOnUniqueValues('1 - 2 - 3 - 3 - 2 - 1', /-/g)).toEqual(['1', '2', '3']);

        expect(
            splitOnUniqueValues(`

   1;

   2

   3

`)
        ).toEqual(['1', '2', '3']);
    });

    it('generateQuickGuid', () => {
        expect(generateQuickGuid().length > 0).toEqual(true);
    });

    it('is string', () => {
        expect(isString('')).toEqual(true);
        expect(isString(0)).toEqual(false);
        expect(isString(NaN)).toEqual(false);
        expect(isString(Infinity)).toEqual(false);
        expect(isString(null)).toEqual(false);
        expect(isString(undefined)).toEqual(false);
    });

    it('correct trim', () => {
        expect(trim('test ')).toEqual('test');
        expect(trim('      test  ')).toEqual('test');
        expect(trim('   test  test  ')).toEqual('test  test');
    });

    it('getLastSymbol', () => {
        expect(getLastSymbol('test ')).toEqual(' ');
        expect(getLastSymbol('test')).toEqual('t');
    });

    it('getFirstSymbol', () => {
        expect(getFirstSymbol('*test ')).toEqual('*');
        expect(getFirstSymbol('e123')).toEqual('e');
    });

    it('removeLastSymbol', () => {
        expect(removeLastSymbol('test ')).toEqual('test');
        expect(removeLastSymbol('123')).toEqual('12');
        expect(removeLastSymbol('')).toEqual('');
    });
});
