import { isEmptyList } from './is-empty-list';

export function isFilledList<T>(arr: T[]): boolean {
    return !isEmptyList(arr);
}
