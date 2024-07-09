import {JoinPipe} from '@angular-ru/cdk/pipes';

describe('[TEST]: Join Pipe', () => {
    it('only separator', () => {
        expect(new JoinPipe().transform('' as any)).toBe('');
        expect(new JoinPipe().transform(' ' as any)).toBe('');
        expect(new JoinPipe().transform(Infinity as any)).toBe('');
        expect(new JoinPipe().transform(undefined)).toBe('');
        expect(new JoinPipe().transform(null)).toBe('');
        expect(new JoinPipe().transform([])).toBe('');
        expect(new JoinPipe().transform([1, 2])).toBe('1,2');
        expect(new JoinPipe().transform([1])).toBe('1');
        expect(new JoinPipe().transform([1, 2], {separator: ', <br> '})).toBe(
            '1, <br> 2',
        );
        expect(new JoinPipe().transform([1, 2, 3], {separator: ', <br> '})).toBe(
            '1, <br> 2, <br> 3',
        );
        expect(new JoinPipe().transform([1, 2, 3], {separator: ' :: '})).toBe(
            '1 :: 2 :: 3',
        );
    });

    it('separator with mapTransformer', () => {
        expect(
            new JoinPipe().transform([{a: 1}], {
                separator: ' :: ',
                mapTransformer: (item: {a: number}): string => item.a.toString(2),
            }),
        ).toBe('1');

        expect(
            new JoinPipe().transform([{a: 1}, {a: 2}, {a: 3}, {a: 4}], {
                separator: ' :: ',
                mapTransformer: (item: {a: number}): string => item.a.toString(2),
            }),
        ).toBe('1 :: 10 :: 11 :: 100');
    });
});
