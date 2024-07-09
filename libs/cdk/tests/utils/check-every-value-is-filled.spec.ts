import {checkEveryValueIsFilled} from '@angular-ru/cdk/utils';

describe('[TEST]: checkEveryValueIsFilled', () => {
    it('should return true if all values is filled', () => {
        expect(checkEveryValueIsFilled(1, 'a', true, [])).toBe(true);
        expect(checkEveryValueIsFilled(1, 'a')).toBe(true);
        expect(checkEveryValueIsFilled(1)).toBe(true);
        expect(checkEveryValueIsFilled(0)).toBe(true);
        expect(checkEveryValueIsFilled([])).toBe(true);
        expect(checkEveryValueIsFilled(true)).toBe(true);
        expect(checkEveryValueIsFilled(false)).toBe(true);
    });

    it('should return false if one value is not filled', () => {
        expect(checkEveryValueIsFilled(null, 1, true, [])).toBe(false);
        expect(checkEveryValueIsFilled(null, 1)).toBe(false);
        expect(checkEveryValueIsFilled(null, null, null)).toBe(false);
        expect(checkEveryValueIsFilled(null)).toBe(false);
        expect(checkEveryValueIsFilled('')).toBe(false);
        expect(checkEveryValueIsFilled('   ')).toBe(false);
        expect(checkEveryValueIsFilled(NaN)).toBe(false);
        expect(checkEveryValueIsFilled(Infinity)).toBe(false);
        expect(checkEveryValueIsFilled(undefined)).toBe(false);
    });
});
