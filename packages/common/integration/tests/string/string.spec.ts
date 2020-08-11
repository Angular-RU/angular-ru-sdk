import { toStringVal, getByteSize, stringify } from '@angular-ru/common/string';

describe('[TEST]: String', () => {
    it('toString', () => {
        expect(toStringVal([1, 2, 3])).toEqual('1,2,3');
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
});
