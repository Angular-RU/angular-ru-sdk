export function include<ArrayEntryType, IncludingType extends ArrayEntryType>(
    valueOrValues: IncludingType | IncludingType[],
): (current: ArrayEntryType) => boolean {
    const includeValues: ArrayEntryType[] = Array.isArray(valueOrValues)
        ? valueOrValues
        : [valueOrValues];

    return function (value: ArrayEntryType): boolean {
        return includeValues.includes(value);
    };
}
