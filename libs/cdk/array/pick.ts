export function pick<ArrayEntryType, ArrayEntryTypeKey extends keyof ArrayEntryType>(
    key: ArrayEntryTypeKey,
): (value: ArrayEntryType) => ArrayEntryType[ArrayEntryTypeKey] {
    return (value: ArrayEntryType): ArrayEntryType[ArrayEntryTypeKey] => value[key];
}
