export function isObject<T>(obj: T): boolean {
    return obj === Object(obj);
}
