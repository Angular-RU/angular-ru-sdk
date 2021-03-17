/**
 * @deprecated use hasOneValue
 */
export function isSingleList<T>(arr?: T[] | null): boolean {
    return (arr || []).length === 1;
}
