import { $any, $cast } from '@angular-ru/common/utils';

describe('[TEST]: Common utils', () => {
    it('$any', () => {
        expect(parseInt($any(1) + $cast('2'))).toEqual(12);
    });
});
