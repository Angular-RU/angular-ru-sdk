import { toStringVal } from '@angular-ru/common/string';

describe('[TEST]: String', () => {
    it('toString', () => {
        expect(toStringVal([1, 2, 3])).toEqual('1,2,3');
        expect(toStringVal([1, 2, 3], (value: number[]) => value.join('; '))).toEqual('1; 2; 3');
    });
});
