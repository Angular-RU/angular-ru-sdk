export function isEmptyList<T>(arr?: T[] | null): boolean {
    return !(arr || []).length;
}
