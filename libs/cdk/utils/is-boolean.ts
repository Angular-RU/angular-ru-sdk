export function isBoolean(value: unknown | any): value is boolean {
    return typeof value === 'boolean';
}
