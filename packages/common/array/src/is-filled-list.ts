import { isEmptyList } from './is-empty-list';

// TODO remove function in next major
/**
 * @deprecated Use <code>hasItems</code> instead
 */
export function isFilledList<T>(arr?: T[] | null): boolean {
    return !isEmptyList(arr);
}
