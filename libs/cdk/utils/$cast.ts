export function $cast<T, K = T>(value: K | any): T {
    return value as T;
}
