import { JoinPipe } from '@angular-ru/cdk/pipes';
import { Any } from '@angular-ru/cdk/typings';

describe('[TEST]: Join Pipe', () => {
    it('only separator', () => {
        expect(new JoinPipe().transform('' as Any)).toEqual('');
        expect(new JoinPipe().transform(' ' as Any)).toEqual('');
        expect(new JoinPipe().transform(Infinity as Any)).toEqual('');
        expect(new JoinPipe().transform(undefined)).toEqual('');
        expect(new JoinPipe().transform(null)).toEqual('');
        expect(new JoinPipe().transform([])).toEqual('');
        expect(new JoinPipe().transform([1, 2])).toEqual('1,2');
        expect(new JoinPipe().transform([1])).toEqual('1');
        expect(new JoinPipe().transform([1, 2], { separator: ', <br> ' })).toEqual('1, <br> 2');
        expect(new JoinPipe().transform([1, 2, 3], { separator: ', <br> ' })).toEqual('1, <br> 2, <br> 3');
        expect(new JoinPipe().transform([1, 2, 3], { separator: ' :: ' })).toEqual('1 :: 2 :: 3');
    });

    it('separator with mapTransformer', () => {
        expect(
            new JoinPipe().transform([{ a: 1 }], {
                separator: ' :: ',
                mapTransformer: (item: { a: number }): string => item.a.toString(2)
            })
        ).toEqual('1');

        expect(
            new JoinPipe().transform([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], {
                separator: ' :: ',
                mapTransformer: (item: { a: number }): string => item.a.toString(2)
            })
        ).toEqual('1 :: 10 :: 11 :: 100');
    });
});
