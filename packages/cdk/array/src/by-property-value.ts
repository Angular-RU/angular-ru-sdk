export function byPropertyValue<ArrayEntryType, ArrayEntryTypeKey extends keyof ArrayEntryType>(
    key: ArrayEntryTypeKey,
    value: ArrayEntryType[ArrayEntryTypeKey]
): (arrayItem: ArrayEntryType) => boolean {
    return (arrayItem: ArrayEntryType): boolean => arrayItem[key] === value;
}
