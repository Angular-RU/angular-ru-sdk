export function isAbsolutePath(path: string, matcher: RegExp = /^(http|https):\/\//): boolean {
    const result: string[] | null = path.match(matcher);
    return !!result;
}
