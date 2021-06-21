import { Nullable } from '@angular-ru/common/typings';

// TODO remove function in next major
/**
 * @deprecated Use <code>hasManyItems</code> instead
 */
export function isMultipleList<T>(arr?: Nullable<T[]>): boolean {
    return (arr || []).length > 1;
}
