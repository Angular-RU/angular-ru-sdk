import { Any } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

export function isIterable<T>(value: Any): value is Iterable<T> {
    return isNotNil(value) && typeof value[Symbol.iterator] === 'function';
}
