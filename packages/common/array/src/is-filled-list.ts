import { isEmptyList } from './public_api';

export function isFilledList<T>(arr: T[]): boolean {
    return !isEmptyList(arr);
}
