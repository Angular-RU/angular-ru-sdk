import {include} from '@angular-ru/cdk/array';
import {PlainObject} from '@angular-ru/cdk/typings';

describe('[TEST]: include', () => {
    it('should include values while filtering', () => {
        expect([1, 2, 3].filter(include([]))).toEqual([]);
        expect([1, 2, 3].filter(include(3))).toEqual([3]);
        expect([1, 2, 3].filter(include(4))).toEqual([]);
        expect([1, 2, 3].filter(include([2, 3, 4]))).toEqual([2, 3]);
        expect([{v: 1}, {v: 2}, {v: 3}].filter(include({v: 1}))).toEqual([]);

        const unique: PlainObject = {v: 1};

        expect([unique, {v: 2}, {v: 3}].filter(include([unique]))).toEqual([unique]);
    });
});
