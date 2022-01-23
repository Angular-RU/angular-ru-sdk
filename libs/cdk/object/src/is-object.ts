export function isObject<T>(object: T): boolean {
    return object === Object(object);
}
