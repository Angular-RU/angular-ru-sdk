import {
    exclude,
    firstItem,
    isEmptyList,
    isFilledList,
    isMultipleList,
    isSingleList,
    partition,
    secondItem,
    thirdItem
} from '@angular-ru/common/array';
import { isNumber } from '@angular-ru/common/number';
import { PlainObject } from '@angular-ru/common/typings';

describe('[TEST]: Array utility', () => {
    it('is single list', () => {
        expect(isSingleList()).toEqual(false);
        expect(isSingleList(null)).toEqual(false);
        expect(isSingleList([])).toEqual(false);
        expect(isSingleList([1, 2])).toEqual(false);
        expect(isSingleList([1])).toEqual(true);
    });

    it('is multiple list', () => {
        expect(isMultipleList()).toEqual(false);
        expect(isMultipleList(null)).toEqual(false);
        expect(isMultipleList([])).toEqual(false);
        expect(isMultipleList([1])).toEqual(false);
        expect(isMultipleList([1, 2])).toEqual(true);
    });

    it('is empty list', () => {
        expect(isEmptyList()).toEqual(true);
        expect(isEmptyList(null)).toEqual(true);
        expect(isEmptyList([])).toEqual(true);
        expect(isEmptyList([1])).toEqual(false);
        expect(isEmptyList([1, 2])).toEqual(false);
    });

    it('is filled list', () => {
        expect(isFilledList()).toEqual(false);
        expect(isFilledList(null)).toEqual(false);
        expect(isFilledList([])).toEqual(false);
        expect(isFilledList([1])).toEqual(true);
        expect(isFilledList([1, 2])).toEqual(true);
    });

    it('is first item', () => {
        expect(firstItem()).toEqual(null);
        expect(firstItem(null)).toEqual(null);
        expect(firstItem([])).toEqual(null);
        expect(firstItem([1])).toEqual(1);
        expect(firstItem([1, 2])).toEqual(1);
    });

    it('is second item', () => {
        expect(secondItem()).toEqual(null);
        expect(secondItem(null)).toEqual(null);
        expect(secondItem([])).toEqual(null);
        expect(secondItem([1])).toEqual(null);
        expect(secondItem([1, 2])).toEqual(2);
    });

    it('is third item', () => {
        expect(thirdItem()).toEqual(null);
        expect(thirdItem(null)).toEqual(null);
        expect(thirdItem([])).toEqual(null);
        expect(thirdItem([1])).toEqual(null);
        expect(thirdItem([1, 2])).toEqual(null);
        expect(thirdItem([1, 2, 3])).toEqual(3);
    });

    it('should divide array by condition', () => {
        expect(partition([1, '2', { v: 3 }, 4], isNumber)).toEqual([
            [1, 4],
            ['2', { v: 3 }]
        ]);
        expect(partition([1, 2, 3, 4], (elem: number): boolean => elem % 2 === 0)).toEqual([
            [2, 4],
            [1, 3]
        ]);
    });

    it('should exclude values while filtering', () => {
        expect([1, 2, 3, 4].filter(exclude([1, 2, 3]))).toEqual([4]);
        expect([1, 2, 3, 4].filter(exclude(4))).toEqual([1, 2, 3]);
        expect([{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }].filter(exclude({ v: 1 }))).toEqual([
            { v: 1 },
            { v: 2 },
            { v: 3 },
            { v: 4 }
        ]);

        const unique: PlainObject = { v: 1 };
        expect([unique, { v: 2 }, { v: 3 }, { v: 4 }].filter(exclude([unique, { v: 2 }]))).toEqual([
            { v: 2 },
            { v: 3 },
            { v: 4 }
        ]);
    });
});
