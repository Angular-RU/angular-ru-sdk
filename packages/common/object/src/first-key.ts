export function firstKey<T>(obj: T): keyof T | null {
    return (Object.keys(obj || {})[0] as keyof T) ?? null;
}
