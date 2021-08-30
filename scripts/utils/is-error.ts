export function isError(err: string): boolean {
    return !(err.includes('Command') && err.includes('not found'));
}
