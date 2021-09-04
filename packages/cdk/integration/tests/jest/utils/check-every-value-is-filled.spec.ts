import { checkEveryValueIsFilled } from '@angular-ru/cdk/utils';

describe('[TEST]: checkEveryValueIsFilled', () => {
    it('should return true if all values is filled', () => {
        expect(checkEveryValueIsFilled(1, 'a', true, [])).toEqual(true);
        expect(checkEveryValueIsFilled(1, 'a')).toEqual(true);
        expect(checkEveryValueIsFilled(1)).toEqual(true);
        expect(checkEveryValueIsFilled(0)).toEqual(true);
        expect(checkEveryValueIsFilled([])).toEqual(true);
        expect(checkEveryValueIsFilled(true)).toEqual(true);
        expect(checkEveryValueIsFilled(false)).toEqual(true);
    });

    it('should return false if one value is not filled', () => {
        expect(checkEveryValueIsFilled(null, 1, true, [])).toEqual(false);
        expect(checkEveryValueIsFilled(null, 1)).toEqual(false);
        expect(checkEveryValueIsFilled(null, null, null)).toEqual(false);
        expect(checkEveryValueIsFilled(null)).toEqual(false);
        expect(checkEveryValueIsFilled('')).toEqual(false);
        expect(checkEveryValueIsFilled('   ')).toEqual(false);
        expect(checkEveryValueIsFilled(NaN)).toEqual(false);
        expect(checkEveryValueIsFilled(Infinity)).toEqual(false);
        expect(checkEveryValueIsFilled(undefined)).toEqual(false);
    });
});
