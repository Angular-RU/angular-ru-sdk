export function getByteSize(value: string): number {
    return new Blob([value]).size;
}
