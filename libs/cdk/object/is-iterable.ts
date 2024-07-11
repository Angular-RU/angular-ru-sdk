import {isNotNil} from '@angular-ru/cdk/utils';

export function isIterable<T>(
    value: T | any | unknown | undefined,
): value is Iterable<T> {
    return isNotNil(value) && typeof value[Symbol.iterator] === 'function';
}
