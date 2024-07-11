export function isString<T>(value: T | unknown | null | undefined): value is string {
    return typeof value === 'string';
}
