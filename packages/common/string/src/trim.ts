export function trim(value?: string | null): string | null | undefined {
    return typeof value === 'string' ? value?.trim() : value;
}
