import { PlainObject } from '@angular-ru/common/typings';

export interface UtilsInterface {
    mergeDeep(...objects: PlainObject[]): PlainObject;
}
