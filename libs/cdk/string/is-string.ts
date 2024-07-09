export function isString<T>(value: T | null | undefined | unknown): value is string {
    return typeof value === 'string';
}
