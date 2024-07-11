import {Nullable} from '@angular-ru/cdk/typings';

export function splitOnUniqueValues(
    value: Nullable<string>,
    separator = /[,;]|(\s+)/g,
): string[] {
    const uniqueValues = new Set<string>();
    const parsedValues: string[] = value?.split(separator) ?? [];

    for (const item of parsedValues) {
        const prepared: string = item?.trim();

        if (prepared) {
            uniqueValues.add(prepared);
        }
    }

    return Array.from(uniqueValues);
}
