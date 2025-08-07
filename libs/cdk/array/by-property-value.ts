export function byPropertyValue<
    ArrayEntryType,
    ArrayEntryTypeKey extends keyof ArrayEntryType,
    ValueType extends ArrayEntryType[ArrayEntryTypeKey],
>(
    key: ArrayEntryTypeKey,
    value: ValueType,
): (
    arrayItem: ArrayEntryType,
) => arrayItem is ArrayEntryType & Record<ArrayEntryTypeKey, ValueType> {
    return (
        arrayItem: ArrayEntryType,
    ): arrayItem is ArrayEntryType & Record<ArrayEntryTypeKey, ValueType> =>
        arrayItem[key] === value;
}
