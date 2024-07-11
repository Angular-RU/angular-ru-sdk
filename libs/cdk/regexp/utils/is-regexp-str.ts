const MIN_SIZE_REGEXP = 2;

export function isRegexpStr(value?: string): boolean {
    return (
        (value?.length ?? 0) > MIN_SIZE_REGEXP &&
        value?.charAt(0) === '/' &&
        value?.charAt(value?.length - 1) === '/'
    );
}
