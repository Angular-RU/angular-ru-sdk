export function getCountSpacesOnString(val?: string | null): number {
    return val?.match(/\s/g)?.length ?? 0;
}
