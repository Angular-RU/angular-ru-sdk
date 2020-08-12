import { firstKey, sortByAsc, sortByDesc } from '@angular-ru/common/object';

describe('[TEST]: Object', () => {
    describe('sorting', () => {
        interface A {
            a: number;
        }

        const objectList: A[] = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: -1 }, { a: 0 }];

        it('sort by asc', () => {
            expect(objectList.slice().sort((a, b) => sortByAsc('a', a, b))).toEqual([
                { a: -1 },
                { a: 0 },
                { a: 1 },
                { a: 2 },
                { a: 3 }
            ]);
        });

        it('sort by desc', () => {
            expect(objectList.slice().sort((a, b) => sortByDesc('a', a, b))).toEqual([
                { a: 3 },
                { a: 2 },
                { a: 1 },
                { a: 0 },
                { a: -1 }
            ]);
        });
    });

    it('should correct return first key', () => {
        expect(firstKey({ a: 1 })).toEqual('a');
        expect(firstKey({ b: 2, a: 1, c: 3 })).toEqual('b');
        expect(firstKey(null)).toEqual(null);
    });
});
