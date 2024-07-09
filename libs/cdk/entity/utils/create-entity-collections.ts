import {EntityCollections} from '../typings/entity-collections';
import {EntityDictionary, EntityIdType} from '../typings/entity-types';

export function createEntityCollections<V, K extends string | number = EntityIdType>(
    collections?: EntityCollections<V, K>,
): EntityCollections<V, K> {
    return (
        collections ?? {
            ids: [],
            entities: {} as EntityDictionary<K, V>,
        }
    );
}
