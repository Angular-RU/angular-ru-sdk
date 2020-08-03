import { updateArray } from '@angular-ru/common/array';
import { Any } from '@angular-ru/common/typings';

describe('[TEST]: Array', () => {
    interface Value {
        id: number;
        value: number;
    }

    const origin: Value[] = [
        { id: 1, value: 1 },
        { id: 2, value: 1 },
        { id: 3, value: 1 },
        { id: 4, value: 1 },
        { id: 5, value: 1 },
        { id: 6, value: 1 }
    ];

    describe('primary key is ID', () => {
        it('should be correct update array when empty array', () => {
            expect(updateArray<Value>(origin, [])).toEqual(origin);
        });

        it('should update two items', () => {
            expect(
                updateArray<Value>(origin, [
                    { id: 3, value: 3 },
                    { id: 5, value: 5 }
                ])
            ).toEqual([
                { id: 1, value: 1 },
                { id: 2, value: 1 },
                { id: 3, value: 3 },
                { id: 4, value: 1 },
                { id: 5, value: 5 },
                { id: 6, value: 1 }
            ]);
        });

        it('should update one item', () => {
            expect(
                updateArray<Value>(origin, [{ id: 1, value: 11 }])
            ).toEqual([
                { id: 1, value: 11 },
                { id: 2, value: 1 },
                { id: 3, value: 1 },
                { id: 4, value: 1 },
                { id: 5, value: 1 },
                { id: 6, value: 1 }
            ]);
        });

        it('should update one item with duplicate', () => {
            expect(
                updateArray<Value>(origin, [
                    { id: 1, value: 11 },
                    { id: 1, value: 22 }
                ])
            ).toEqual([
                { id: 1, value: 11 },
                { id: 2, value: 1 },
                { id: 3, value: 1 },
                { id: 4, value: 1 },
                { id: 5, value: 1 },
                { id: 6, value: 1 }
            ]);
        });

        it('should update one item', () => {
            expect(
                updateArray<Value>(origin, [{ value: 5 } as Any])
            ).toEqual(origin);
        });
    });

    describe('CompareFn', () => {
        it('should update two items', () => {
            expect(
                updateArray<Value>(
                    origin,
                    [
                        { id: 3, value: 3 },
                        { id: 5, value: 5 }
                    ],
                    (a: Value, b: Value): boolean => a.id === b.id
                )
            ).toEqual([
                { id: 1, value: 1 },
                { id: 2, value: 1 },
                { id: 3, value: 3 },
                { id: 4, value: 1 },
                { id: 5, value: 5 },
                { id: 6, value: 1 }
            ]);
        });
    });
});
