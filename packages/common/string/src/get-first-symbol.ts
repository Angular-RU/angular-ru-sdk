export function getFirstSymbol(val?: string | null): string | undefined {
    return val?.slice(0, 1);
}
