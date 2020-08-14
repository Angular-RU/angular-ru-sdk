import { isNumber } from '@angular-ru/common/number';

describe('[TEST]: Number', () => {
    it('is number', () => {
        expect(isNumber(0)).toEqual(true);
        expect(isNumber(NaN)).toEqual(true);
        expect(isNumber(Infinity)).toEqual(true);
        expect(isNumber('')).toEqual(false);
        expect(isNumber(null)).toEqual(false);
        expect(isNumber(undefined)).toEqual(false);
    });
});
