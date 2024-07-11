export function trim<T extends string | null | undefined>(
    value: T,
): (T & null) | (T & string) | (T & undefined) {
    // note: don't use isString for preserve circular dependencies
    return (typeof value === 'string' ? value?.trim() : value) as T;
}
