export function isNumber<T>(value: T | number | unknown | undefined): value is number {
    return typeof value === 'number';
}
