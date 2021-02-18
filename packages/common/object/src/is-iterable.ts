import { Any } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

export function isIterable<T>(value: Any): value is Iterable<T> {
    return isNotNil(value) && typeof value[Symbol.iterator] === 'function';
}
