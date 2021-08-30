export function trim(val: string): string {
    return val.trim().replace(/<!--.*?-->/g, '');
}
