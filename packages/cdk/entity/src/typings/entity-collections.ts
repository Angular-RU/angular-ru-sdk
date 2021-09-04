import { Any } from '@angular-ru/cdk/typings';

import { EntityDictionary, EntityIdType } from './entity-types';

export type EntityCollections<V, K extends number | string = EntityIdType, C = Record<string, Any>> = {
    ids: K[];
    entities: EntityDictionary<K, V>;
} & C;
