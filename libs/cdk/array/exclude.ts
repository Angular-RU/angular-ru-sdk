export function exclude<ArrayEntryType, ExcludingType extends ArrayEntryType>(
    valueOrValues: ExcludingType | ExcludingType[],
): (current: ArrayEntryType) => boolean {
    const excludeValues: ArrayEntryType[] = Array.isArray(valueOrValues)
        ? valueOrValues
        : [valueOrValues];

    return function (value: ArrayEntryType): boolean {
        return !excludeValues.includes(value);
    };
}
