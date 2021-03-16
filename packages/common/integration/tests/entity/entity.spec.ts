import { createEntityCollections, createIdsMapOf } from '@angular-ru/common/entity';

describe('[TEST]: Entity', () => {
    it('should be correct create defaults', () => {
        expect(createEntityCollections()).toEqual({ ids: [], entities: {} });

        expect(
            createEntityCollections({
                ids: [1, 2, 3],
                entities: {
                    1: { a: 1 },
                    2: { a: 2 },
                    3: { a: 3 }
                }
            })
        ).toEqual({
            ids: [1, 2, 3],
            entities: {
                1: { a: 1 },
                2: { a: 2 },
                3: { a: 3 }
            }
        });
    });

    it('createIdsMapOf', () => {
        expect(
            createIdsMapOf([
                { id: 1, name: 'a' },
                { id: 2, name: 'b' }
            ])
        ).toEqual({
            1: { id: 1, name: 'a' },
            2: { id: 2, name: 'b' }
        });
    });
});
