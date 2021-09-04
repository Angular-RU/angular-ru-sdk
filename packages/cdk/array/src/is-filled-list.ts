import { Nullable } from '@angular-ru/cdk/typings';

import { isEmptyList } from './is-empty-list';

// TODO remove function in next major
/**
 * @deprecated Use <code>hasItems</code> instead
 */
export function isFilledList<T>(arr?: Nullable<T[]>): boolean {
    return !isEmptyList(arr);
}
