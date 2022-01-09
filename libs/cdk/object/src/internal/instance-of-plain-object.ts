import { PlainObject } from '@angular-ru/cdk/typings';

export function instanceOfPlainObject(plainObject: PlainObject): boolean {
    return Object.prototype.toString.call(plainObject) === '[object Object]';
}
