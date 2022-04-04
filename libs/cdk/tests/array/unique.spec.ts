import { unique } from '@angular-ru/cdk/array';

describe('[TEST]: unique', () => {
    const a: any = {};
    const b: any = {};
    const c: any = {};

    it('should return empty array', () => {
        expect([].filter((element, index, self) => unique(element, index, self))).toEqual([]);
    });
    it('should return one object', () => {
        expect([a].filter((element, index, self) => unique(element, index, self))).toEqual([a]);
    });
    it('should return the same array', () => {
        expect([a, b, c].filter((element, index, self) => unique(element, index, self))).toEqual([a, b, c]);
    });
    it('should return array with no duplicates of objects', () => {
        expect([a, b, c, c, a].filter((element, index, self) => unique(element, index, self))).toEqual([a, b, c]);
    });
    it('should return array with no duplicates of strings', () => {
        expect(['a', 'b', 'b', 'b'].filter((element, index, self) => unique(element, index, self))).toEqual(['a', 'b']);
    });
    it('should return array with no duplicates of numbers', () => {
        expect([13, 13, 13].filter((element, index, self) => unique(element, index, self))).toEqual([13]);
    });
    it('should return array with no duplicates according to values and types', () => {
        expect([a, a, 'a', 13, 13, '13'].filter((element, index, self) => unique(element, index, self))).toEqual([
            a,
            'a',
            13,
            '13'
        ]);
    });
    it('should return array with no duplicates of booleans', () => {
        expect([true, true, false].filter((element, index, self) => unique(element, index, self))).toEqual([
            true,
            false
        ]);
    });
    it('should return array with no duplicates of "no value" types', () => {
        expect(
            [null, null, undefined, undefined, '', '', Infinity, Infinity].filter((element, index, self) =>
                unique(element, index, self)
            )
        ).toEqual([null, undefined, '', Infinity]);
    });
    it('should return empty array for the array of "NaN"', () => {
        expect([NaN, NaN].filter((element, index, self) => unique(element, index, self))).toEqual([]);
    });
});
