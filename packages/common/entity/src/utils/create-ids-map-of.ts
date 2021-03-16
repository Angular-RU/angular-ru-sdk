import { IdsMapOf } from '../typings/ids-map-of';

export function createIdsMapOf<T extends { id: number }>(entities: T[]): IdsMapOf<T> {
    const map: IdsMapOf<T> = {};

    for (const entity of entities) {
        map[entity.id] = entity;
    }

    return map;
}
