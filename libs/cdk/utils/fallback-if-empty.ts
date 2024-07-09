import {EmptyValue} from '@angular-ru/cdk/typings';

import {checkValueIsEmpty} from './check-value-is-empty';

export function fallbackIfEmpty<V, F>(
    value: V,
    fallback: F,
): (V extends EmptyValue ? never : V) | (V & EmptyValue extends never ? never : F) {
    return (checkValueIsEmpty(value) ? fallback : value) as
        | (V extends EmptyValue ? never : V)
        | (V & EmptyValue extends never ? never : F);
}
