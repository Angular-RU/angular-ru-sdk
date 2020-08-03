export function isEmptyList<T>(arr: T[]): boolean {
    return !(arr || []).length;
}
