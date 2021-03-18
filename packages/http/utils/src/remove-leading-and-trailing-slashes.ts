export function removeLeadingAndTrailingSlashes(inputString: string): string {
    const pattern: RegExp = new RegExp('^\\/+|\\/+$', 'g');
    return inputString.replace(pattern, '');
}
