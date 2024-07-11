import {EmptyValue} from '@angular-ru/cdk/typings';

import {checkValueIsEmpty} from './check-value-is-empty';

export function fallbackIfEmpty<V, F>(
    value: V,
    fallback: F,
): (EmptyValue & V extends never ? never : F) | (V extends EmptyValue ? never : V) {
    return (checkValueIsEmpty(value) ? fallback : value) as
        | (EmptyValue & V extends never ? never : F)
        | (V extends EmptyValue ? never : V);
}
