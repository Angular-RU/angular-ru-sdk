export function isSingleList<T>(arr: T[]): boolean {
    return (arr || []).length === 1;
}
