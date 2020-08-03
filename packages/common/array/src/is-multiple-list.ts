export function isMultipleList<T>(arr: T[]): boolean {
    return (arr || []).length > 1;
}
