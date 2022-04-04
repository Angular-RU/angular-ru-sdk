import { isNotNil } from '@angular-ru/cdk/utils';

export function isIterable<T>(value: any): value is Iterable<T> {
    return isNotNil(value) && typeof value[Symbol.iterator] === 'function';
}
