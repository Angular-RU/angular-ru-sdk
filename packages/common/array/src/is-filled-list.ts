import { isEmptyList } from './is-empty-list';

/**
 * @deprecated Use <code>hasItems</code> instead
 */
export function isFilledList<T>(arr?: T[] | null): boolean {
    return !isEmptyList(arr);
}
