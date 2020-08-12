export function splitOnUniqueValues(value: string | null | undefined, separator: RegExp = /[,;]/g): string[] {
    const uniqueValues: Set<string> = new Set();
    const parsedValues: string[] = value?.split(separator) ?? [];

    for (const item of parsedValues) {
        const prepared: string = item.trim();
        if (prepared) {
            uniqueValues.add(prepared);
        }
    }

    return Array.from(uniqueValues);
}
