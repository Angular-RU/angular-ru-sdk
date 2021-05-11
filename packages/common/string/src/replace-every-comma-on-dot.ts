export function replaceEveryCommaOnDot(val?: string | null): string {
    return val?.replace(/,/g, '.') ?? '';
}
