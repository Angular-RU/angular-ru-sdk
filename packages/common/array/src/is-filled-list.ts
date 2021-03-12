import { isEmptyList } from './is-empty-list';

export function isFilledList<T>(arr?: T[] | null): boolean {
    return !isEmptyList(arr);
}
