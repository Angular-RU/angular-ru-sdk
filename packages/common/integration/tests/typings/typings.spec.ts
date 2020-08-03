import { Any } from '@angular-ru/common/typings';

describe('[TEST]: Common types', () => {
    it('any: sample duck typing', () => {
        const a: Any = 5;
        const b: Any = '8';

        // Duck typing
        expect(parseInt(a + b)).toEqual(58);
    });
});
