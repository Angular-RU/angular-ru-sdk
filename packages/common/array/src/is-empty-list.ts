import { Nullable } from '@angular-ru/common/typings';

// TODO remove function in next major
/**
 * @deprecated Use <code>hasNoItems</code> instead
 */
export function isEmptyList<T>(arr?: Nullable<T[]>): boolean {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return !(arr ?? []).length;
}
