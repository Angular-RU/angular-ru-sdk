import { isEmptyList } from './is-empty-list';

/**
 * @deprecated use hasValues
 */
export function isFilledList<T>(arr?: T[] | null): boolean {
    return !isEmptyList(arr);
}
