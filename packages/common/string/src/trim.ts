export function trim(value?: string | null): string | null | undefined {
    // note: don't use isString for preserve circular dependencies
    return typeof value === 'string' ? value?.trim() : value;
}
