export function trim(value: string): string {
    return value.trim().replace(/<!--.*?-->/g, '');
}
