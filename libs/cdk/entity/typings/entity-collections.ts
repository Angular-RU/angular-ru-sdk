import {EntityDictionary, EntityIdType} from './entity-types';

export type EntityCollections<
    V,
    K extends number | string = EntityIdType,
    C = Record<string, any>,
> = C & {
    ids: K[];
    entities: EntityDictionary<K, V>;
};
