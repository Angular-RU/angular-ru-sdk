export function byPropertyValue<
    ArrayEntryType,
    ArrayEntryTypeKey extends keyof ArrayEntryType,
    ValueType extends ArrayEntryType[ArrayEntryTypeKey],
>(
    key: ArrayEntryTypeKey,
    value: ValueType,
): (
    arrayItem: ArrayEntryType,
) => arrayItem is ArrayEntryType & {[key in ArrayEntryTypeKey]: ValueType} {
    return (
        arrayItem: ArrayEntryType,
    ): arrayItem is ArrayEntryType & {[key in ArrayEntryTypeKey]: ValueType} =>
        arrayItem[key] === value;
}
