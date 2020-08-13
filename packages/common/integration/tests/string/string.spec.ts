import {
    toStringVal,
    getByteSize,
    stringify,
    capitalize,
    splitOnUniqueValues,
    generateQuickGuid
} from '@angular-ru/common/string';

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
        expect(generateQuickGuid().length >= 20).toEqual(true);
    });
});
