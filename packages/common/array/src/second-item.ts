import { Any, Nullable } from '@angular-ru/common/typings';

/**
 * @deprecated: use takeSecondItem
 */
export function secondItem<T>(array?: Nullable<T[]>, fallback: Any = null): Nullable<T> {
    return Array.isArray(array) && array.length ? array[1] ?? fallback : null!;
}
