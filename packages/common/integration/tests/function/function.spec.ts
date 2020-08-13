import { isFunctionLike } from '@angular-ru/common/function';

describe('[TEST]: Function', () => {
    it('is function', () => {
        class A {}

        expect(isFunctionLike(null)).toEqual(false);
        expect(isFunctionLike(A)).toEqual(true);
        expect(isFunctionLike(() => {})).toEqual(true);
        expect(isFunctionLike(1)).toEqual(false);
        expect(isFunctionLike({})).toEqual(false);
        expect(isFunctionLike([])).toEqual(false);
        expect(isFunctionLike('')).toEqual(false);
    });
});
