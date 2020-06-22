import { Any, KeyMap } from '../../interfaces/table-builder.internal';

export interface UtilsInterface {
    clone<T = Any>(obj: T): T;
    isObject<T = object>(obj: T): boolean;
    mergeDeep(...objects: KeyMap[]): KeyMap;
    readonly bodyRect?: ClientRect | DOMRect;
}
