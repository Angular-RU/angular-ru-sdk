import {byPropertyValue} from '@angular-ru/cdk/array';

interface SampleValue {
    a: string;
    b: number;
}

describe('[TEST]: byPropertyValue', () => {
    const arr1: SampleValue[] = [
        {a: 'title', b: 1},
        {a: 'title2', b: 2},
        {a: 'title3', b: 3},
    ];
    const arr2: SampleValue[] = [
        {a: 'title', b: 1},
        {a: 'title', b: 3},
        {a: 'title3', b: 3},
    ];

    it('should find target array item by given keyvalue pair correctly', () => {
        expect(arr1.find(byPropertyValue('a', 'title'))).toStrictEqual({
            a: 'title',
            b: 1,
        });
        expect(arr1.find(byPropertyValue('b', 1))).toStrictEqual({a: 'title', b: 1});
        expect(arr1.find(byPropertyValue('b', 2))).toStrictEqual({a: 'title2', b: 2});
        expect(arr1.find(byPropertyValue('a', 'title3'))).toStrictEqual({
            a: 'title3',
            b: 3,
        });
    });

    it('should filter target array by given keyvalue pair correctly', () => {
        expect(arr2.filter(byPropertyValue('a', 'title'))).toStrictEqual([
            {a: 'title', b: 1},
            {a: 'title', b: 3},
        ]);
        expect(arr2.filter(byPropertyValue('b', 1))).toStrictEqual([{a: 'title', b: 1}]);
        expect(arr2.filter(byPropertyValue('b', 3))).toStrictEqual([
            {a: 'title', b: 3},
            {a: 'title3', b: 3},
        ]);
    });

    it('should process empty results correctly', () => {
        expect(arr1.find(byPropertyValue('a', 'value'))).toBeUndefined();
        expect(arr1.find(byPropertyValue('b', 10))).toBeUndefined();
        expect(arr2.filter(byPropertyValue('a', 'value'))).toStrictEqual([]);
        expect(arr2.filter(byPropertyValue('b', 10))).toStrictEqual([]);
    });
});
