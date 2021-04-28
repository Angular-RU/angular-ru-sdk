export function removeNonNumericSymbols(val?: string | null): string {
    return val?.replace(/[^\d,.-]/g, '') ?? '';
}
