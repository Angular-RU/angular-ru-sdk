import {
    exclude,
    firstItem,
    isEmptyList,
    isFilledList,
    isMultipleList,
    isSingleList,
    hasManyItems,
    hasAtMostOneItem,
    hasItems,
    hasNoItems,
    hasOneItem,
    partition,
    secondItem,
    thirdItem,
    takeFirstItem,
    takeSecondItem,
    takeThirdItem,
    takeLastItem
} from '@angular-ru/cdk/array';
import { isNumber } from '@angular-ru/cdk/number';
import { PlainObject } from '@angular-ru/cdk/typings';

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

    it('has items', () => {
        expect(hasItems([1])).toEqual(true);
        expect(hasItems([1, 2, 3])).toEqual(true);
        expect(hasItems([])).toEqual(false);
        expect(hasItems(null)).toEqual(false);
        expect(hasItems(undefined)).toEqual(false);
        expect(hasItems()).toEqual(false);
    });

    it('has no items', () => {
        expect(hasNoItems([1])).toEqual(false);
        expect(hasNoItems([1, 2, 3])).toEqual(false);
        expect(hasNoItems([])).toEqual(true);
        expect(hasNoItems(null)).toEqual(true);
        expect(hasNoItems(undefined)).toEqual(true);
        expect(hasNoItems()).toEqual(true);
    });

    it('has one item', () => {
        expect(hasOneItem([1])).toEqual(true);
        expect(hasOneItem([1, 2, 3])).toEqual(false);
        expect(hasOneItem([])).toEqual(false);
        expect(hasOneItem(null)).toEqual(false);
        expect(hasOneItem(undefined)).toEqual(false);
        expect(hasOneItem()).toEqual(false);
    });

    it('has many items', () => {
        expect(hasManyItems([1])).toEqual(false);
        expect(hasManyItems([1, 2, 3])).toEqual(true);
        expect(hasManyItems([])).toEqual(false);
        expect(hasManyItems(null)).toEqual(false);
        expect(hasManyItems(undefined)).toEqual(false);
        expect(hasManyItems()).toEqual(false);
    });

    it('has at most one item', () => {
        expect(hasAtMostOneItem([1])).toEqual(true);
        expect(hasAtMostOneItem([1, 2, 3])).toEqual(false);
        expect(hasAtMostOneItem([])).toEqual(true);
        expect(hasAtMostOneItem(null)).toEqual(true);
        expect(hasAtMostOneItem(undefined)).toEqual(true);
        expect(hasAtMostOneItem()).toEqual(true);
    });

    it('is first item', () => {
        expect(firstItem()).toEqual(null);
        expect(firstItem(null)).toEqual(null);
        expect(firstItem([])).toEqual(null);
        expect(firstItem([1])).toEqual(1);
        expect(firstItem([1, 2])).toEqual(1);

        expect(takeFirstItem()).toEqual(undefined);
        expect(takeFirstItem(null)).toEqual(undefined);
        expect(takeFirstItem([])).toEqual(undefined);
        expect(takeFirstItem([1])).toEqual(1);
        expect(takeFirstItem([1, 2])).toEqual(1);
    });

    it('is second item', () => {
        expect(secondItem()).toEqual(null);
        expect(secondItem(null)).toEqual(null);
        expect(secondItem([])).toEqual(null);
        expect(secondItem([1])).toEqual(null);
        expect(secondItem([1, 2])).toEqual(2);

        expect(takeSecondItem()).toEqual(undefined);
        expect(takeSecondItem(null)).toEqual(undefined);
        expect(takeSecondItem([])).toEqual(undefined);
        expect(takeSecondItem([1])).toEqual(undefined);
        expect(takeSecondItem([1, 2])).toEqual(2);
    });

    it('is third item', () => {
        expect(thirdItem()).toEqual(null);
        expect(thirdItem(null)).toEqual(null);
        expect(thirdItem([])).toEqual(null);
        expect(thirdItem([1])).toEqual(null);
        expect(thirdItem([1, 2])).toEqual(null);
        expect(thirdItem([1, 2, 3])).toEqual(3);

        expect(takeThirdItem()).toEqual(undefined);
        expect(takeThirdItem(null)).toEqual(undefined);
        expect(takeThirdItem([])).toEqual(undefined);
        expect(takeThirdItem([1])).toEqual(undefined);
        expect(takeThirdItem([1, 2, 3])).toEqual(3);
    });

    it('is last item', () => {
        expect(takeLastItem()).toEqual(undefined);
        expect(takeLastItem(null)).toEqual(undefined);
        expect(takeLastItem([])).toEqual(undefined);
        expect(takeLastItem([1])).toEqual(1);
        expect(takeLastItem([1, 2, 3, 4])).toEqual(4);
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
