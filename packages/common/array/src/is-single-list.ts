import { Nullable } from '@angular-ru/common/typings';

// TODO remove function in next major
/**
 * @deprecated Use <code>hasOneItem</code> instead
 */
export function isSingleList<T>(arr?: Nullable<T[]>): boolean {
    return (arr ?? []).length === 1;
}
