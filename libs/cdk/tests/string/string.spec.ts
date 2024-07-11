import {
    capitalize,
    generateQuickGuid,
    getByteSize,
    getCountSpacesOnString,
    getFirstSymbol,
    getLastSymbol,
    isString,
    removeLastSymbol,
    removeNonNumericSymbols,
    replaceEveryCommaOnDot,
    splitOnUniqueValues,
    stringify,
    toStringValue,
    trim,
} from '@angular-ru/cdk/string';

describe('[TEST]: String', () => {
    it('toString', () => {
        expect(toStringValue([1, 2, 3])).toBe('1,2,3');
        expect(toStringValue([1, 2, 3], {} as any)).toBe('1,2,3');
        expect(toStringValue([1, 2, 3], (value: number[]) => value.join('; '))).toBe(
            '1; 2; 3',
        );
    });

    it('get byte size', () => {
        expect(getByteSize('сын')).toBe(6);
        expect(getByteSize('son')).toBe(3);
    });

    it('stringify', () => {
        expect(stringify({a: 1, b: {c: 2}})).toBe(
            `{
    "a": 1,
    "b": {
        "c": 2
    }
}`,
        );

        expect(stringify(1)).toBe('1');
        expect(stringify(null)).toBe('null');
        expect(stringify(NaN)).toBe('null');
        expect(stringify(Infinity)).toBe('null');
        expect(stringify(undefined)).toBe('undefined');
    });

    it('capitalize', () => {
        expect(capitalize('hello world')).toBe('Hello world');
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
            '0',
        ]);

        expect(splitOnUniqueValues('1 - 2 - 3 - 3 - 2 - 1', /-/g)).toEqual([
            '1',
            '2',
            '3',
        ]);

        expect(
            splitOnUniqueValues(`

   1;

   2

   3

`),
        ).toEqual(['1', '2', '3']);
    });

    it('generateQuickGuid', () => {
        expect(generateQuickGuid().length).toBeGreaterThan(0);
    });

    it('is string', () => {
        expect(isString('')).toBe(true);
        expect(isString(0)).toBe(false);
        expect(isString(NaN)).toBe(false);
        expect(isString(Infinity)).toBe(false);
        expect(isString(null)).toBe(false);
        expect(isString(undefined)).toBe(false);
    });

    it('correct trim', () => {
        expect(trim('test ')).toBe('test');
        expect(trim('      test  ')).toBe('test');
        expect(trim('   test  test  ')).toBe('test  test');
    });

    it('getLastSymbol', () => {
        expect(getLastSymbol('test ')).toBe(' ');
        expect(getLastSymbol('test')).toBe('t');
    });

    it('getFirstSymbol', () => {
        expect(getFirstSymbol('*test ')).toBe('*');
        expect(getFirstSymbol('e123')).toBe('e');
    });

    it('removeLastSymbol', () => {
        expect(removeLastSymbol('test ')).toBe('test');
        expect(removeLastSymbol('123')).toBe('12');
        expect(removeLastSymbol('')).toBe('');
    });

    it('replaceEveryCommaOnDot', () => {
        expect(replaceEveryCommaOnDot('1,2,3')).toBe('1.2.3');
        expect(replaceEveryCommaOnDot('1,2...3,5')).toBe('1.2...3.5');
        expect(replaceEveryCommaOnDot(null)).toBe('');
        expect(replaceEveryCommaOnDot()).toBe('');
    });

    it('getCountSpacesOnString', () => {
        expect(getCountSpacesOnString('')).toBe(0);
        expect(getCountSpacesOnString('1 2 3')).toBe(2);
        expect(getCountSpacesOnString(null)).toBe(0);
        expect(getCountSpacesOnString()).toBe(0);
    });

    it('removeNonNumericSymbols', () => {
        expect(removeNonNumericSymbols('Tsgqw__-123,525.asdasd!~s . adqasllZ*a')).toBe(
            '-123,525..',
        );
        expect(removeNonNumericSymbols('1 2 3')).toBe('123');
        expect(removeNonNumericSymbols(null)).toBe('');
        expect(removeNonNumericSymbols()).toBe('');
    });
});
