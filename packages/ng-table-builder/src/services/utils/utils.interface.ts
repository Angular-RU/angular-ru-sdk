import { Any, PlainObject } from '@angular-ru/common/typings';

export interface UtilsInterface {
    clone<T = Any>(obj: T): T;
    isObject<T = Record<string, unknown>>(obj: T): boolean;
    mergeDeep(...objects: PlainObject[]): PlainObject;
    readonly bodyRect?: ClientRect | DOMRect;
}
