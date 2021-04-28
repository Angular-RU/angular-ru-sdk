export function removeLastSymbol(val?: string | null): string | undefined {
    return val?.slice(0, -1);
}
