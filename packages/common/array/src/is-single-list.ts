// TODO remove function in next major
/**
 * @deprecated Use <code>hasOneItem</code> instead
 */
export function isSingleList<T>(arr?: T[] | null): boolean {
    return (arr || []).length === 1;
}
