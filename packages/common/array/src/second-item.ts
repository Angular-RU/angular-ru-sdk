import { Any } from '@angular-ru/common/typings';

/**
 * @deprecated: use takeSecondItem
 */
export function secondItem<T>(array?: T[] | null | undefined, fallback: Any = null): T | null {
    return Array.isArray(array) && array.length ? array[1] ?? fallback : null!;
}
