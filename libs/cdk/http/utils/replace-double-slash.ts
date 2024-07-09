export function replaceDoubleSlash(url: string): string {
    return url?.replace(/(https?:\/\/)|(\/)+/g, '$1$2');
}
