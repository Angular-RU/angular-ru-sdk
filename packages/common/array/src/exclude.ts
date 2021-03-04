export function exclude<T = unknown>(value: T | T[]): (current: T) => boolean {
    const excludeValues: T[] = Array.isArray(value) ? value : [value];
    return function (current: T): boolean {
        return !excludeValues.includes(current);
    };
}
