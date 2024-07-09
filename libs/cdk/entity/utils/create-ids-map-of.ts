import {PlainObject} from '@angular-ru/cdk/typings';

import {IdsMapOf} from '../typings/ids-map-of';

export function createIdsMapOf<T extends PlainObject, K extends keyof T = 'id'>(
    entities: T[],
    primaryKey: keyof T = 'id' as any,
): IdsMapOf<T, K> {
    const map: IdsMapOf<T, K> = {} as IdsMapOf<T, K>;

    for (const entity of entities) {
        if (entity.hasOwnProperty(primaryKey)) {
            const keyId: T[K] = entity[primaryKey] as T[K];

            map[keyId] = entity;
        } else {
            throw new Error(
                `The current entity doesn't have primaryKey - ${primaryKey.toLocaleString()}.`,
            );
        }
    }

    return map;
}
