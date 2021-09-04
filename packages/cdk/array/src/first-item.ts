import { Any, Nullable } from '@angular-ru/cdk/typings';

/**
 * @deprecated: use takeFirstItem
 */
export function firstItem<T>(array?: Nullable<T[]>, fallback: Any = null): Nullable<T> {
    return Array.isArray(array) && array.length ? array[0] ?? fallback : null!;
}
