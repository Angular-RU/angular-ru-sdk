export function isError(err: string): boolean {
    return !/Command(.+)not found/g.test(err);
}
