import {
    exclude,
    hasAtMostOneItem,
    hasItems,
    hasManyItems,
    hasNoItems,
    hasOneItem,
    partition,
    takeFirstItem,
    takeLastItem,
    takeSecondItem,
    takeThirdItem,
} from '@angular-ru/cdk/array';
import {isNumber} from '@angular-ru/cdk/number';
import {PlainObject} from '@angular-ru/cdk/typings';

describe('[TEST]: Array utility', () => {
    it('has items', () => {
        expect(hasItems([1])).toBe(true);
        expect(hasItems([1, 2, 3])).toBe(true);
        expect(hasItems([])).toBe(false);
        expect(hasItems(null)).toBe(false);
        expect(hasItems(undefined)).toBe(false);
        expect(hasItems()).toBe(false);
    });

    it('has no items', () => {
        expect(hasNoItems([1])).toBe(false);
        expect(hasNoItems([1, 2, 3])).toBe(false);
        expect(hasNoItems([])).toBe(true);
        expect(hasNoItems(null)).toBe(true);
        expect(hasNoItems(undefined)).toBe(true);
        expect(hasNoItems()).toBe(true);
    });

    it('has one item', () => {
        expect(hasOneItem([1])).toBe(true);
        expect(hasOneItem([1, 2, 3])).toBe(false);
        expect(hasOneItem([])).toBe(false);
        expect(hasOneItem(null)).toBe(false);
        expect(hasOneItem(undefined)).toBe(false);
        expect(hasOneItem()).toBe(false);
    });

    it('has many items', () => {
        expect(hasManyItems([1])).toBe(false);
        expect(hasManyItems([1, 2, 3])).toBe(true);
        expect(hasManyItems([])).toBe(false);
        expect(hasManyItems(null)).toBe(false);
        expect(hasManyItems(undefined)).toBe(false);
        expect(hasManyItems()).toBe(false);
    });

    it('has at most one item', () => {
        expect(hasAtMostOneItem([1])).toBe(true);
        expect(hasAtMostOneItem([1, 2, 3])).toBe(false);
        expect(hasAtMostOneItem([])).toBe(true);
        expect(hasAtMostOneItem(null)).toBe(true);
        expect(hasAtMostOneItem(undefined)).toBe(true);
        expect(hasAtMostOneItem()).toBe(true);
    });

    it('is first item', () => {
        expect(takeFirstItem()).toBeUndefined();
        expect(takeFirstItem(null)).toBeUndefined();
        expect(takeFirstItem([])).toBeUndefined();
        expect(takeFirstItem([1])).toBe(1);
        expect(takeFirstItem([1, 2])).toBe(1);
    });

    it('is second item', () => {
        expect(takeSecondItem()).toBeUndefined();
        expect(takeSecondItem(null)).toBeUndefined();
        expect(takeSecondItem([])).toBeUndefined();
        expect(takeSecondItem([1])).toBeUndefined();
        expect(takeSecondItem([1, 2])).toBe(2);
    });

    it('is third item', () => {
        expect(takeThirdItem()).toBeUndefined();
        expect(takeThirdItem(null)).toBeUndefined();
        expect(takeThirdItem([])).toBeUndefined();
        expect(takeThirdItem([1])).toBeUndefined();
        expect(takeThirdItem([1, 2, 3])).toBe(3);
    });

    it('is last item', () => {
        expect(takeLastItem()).toBeUndefined();
        expect(takeLastItem(null)).toBeUndefined();
        expect(takeLastItem([])).toBeUndefined();
        expect(takeLastItem([1])).toBe(1);
        expect(takeLastItem([1, 2, 3, 4])).toBe(4);
    });

    it('should divide array by condition', () => {
        expect(partition([1, '2', {v: 3}, 4], isNumber)).toEqual([
            [1, 4],
            ['2', {v: 3}],
        ]);
        expect(
            partition([1, 2, 3, 4], (element: number): boolean => element % 2 === 0),
        ).toEqual([
            [2, 4],
            [1, 3],
        ]);
    });

    it('should exclude values while filtering', () => {
        expect([1, 2, 3, 4].filter(exclude([1, 2, 3]))).toEqual([4]);
        expect([1, 2, 3, 4].filter(exclude(4))).toEqual([1, 2, 3]);
        expect([{v: 1}, {v: 2}, {v: 3}, {v: 4}].filter(exclude({v: 1}))).toEqual([
            {v: 1},
            {v: 2},
            {v: 3},
            {v: 4},
        ]);

        const unique: PlainObject = {v: 1};

        expect(
            [unique, {v: 2}, {v: 3}, {v: 4}].filter(exclude([unique, {v: 2}])),
        ).toEqual([{v: 2}, {v: 3}, {v: 4}]);
    });
});
