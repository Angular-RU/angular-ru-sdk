import { Any } from '@angular-ru/common/typings';

/**
 * @deprecated use firstEntry
 */
export function firstItem<T>(array?: T[] | null | undefined, fallback: Any = null): T | null {
    return Array.isArray(array) && array.length ? array[0] ?? fallback : null!;
}
