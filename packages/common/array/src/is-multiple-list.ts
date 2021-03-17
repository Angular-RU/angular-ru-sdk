/**
 * @deprecated use hasManyValues
 */
export function isMultipleList<T>(arr?: T[] | null): boolean {
    return (arr || []).length > 1;
}
