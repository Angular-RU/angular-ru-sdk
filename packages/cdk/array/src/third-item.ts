import { Any, Nullable } from '@angular-ru/cdk/typings';

/**
 * @deprecated: use takeThirdItem
 */
export function thirdItem<T>(array?: Nullable<T[]>, fallback: Any = null): Nullable<T> {
    const thirdItemIndex: number = 2;
    return Array.isArray(array) && array.length ? array[thirdItemIndex] ?? fallback : null!;
}
