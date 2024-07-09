import {Nullable} from '@angular-ru/cdk/typings';

export function splitOnUniqueValues(
    value: Nullable<string>,
    separator: RegExp = /[,;]|(\s+)/g,
): string[] {
    const uniqueValues: Set<string> = new Set();
    const parsedValues: string[] = value?.split(separator) ?? [];

    for (const item of parsedValues) {
        const prepared: string = item?.trim();

        if (prepared) {
            uniqueValues.add(prepared);
        }
    }

    return Array.from(uniqueValues);
}
