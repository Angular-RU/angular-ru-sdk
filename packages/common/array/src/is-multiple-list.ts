/**
 * @deprecated Use <code>hasManyItems</code> instead
 */
export function isMultipleList<T>(arr?: T[] | null): boolean {
    return (arr || []).length > 1;
}
