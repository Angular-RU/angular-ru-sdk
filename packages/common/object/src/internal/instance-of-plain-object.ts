import { PlainObject } from '@angular-ru/common/typings';

export function instanceOfPlainObject(plainObject: PlainObject): boolean {
    return Object.prototype.toString.call(plainObject) === '[object Object]';
}
