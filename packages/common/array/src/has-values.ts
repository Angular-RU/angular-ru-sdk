export function hasValues<EntryType>(array: EntryType[]): array is [EntryType, ...EntryType[]] {
    return array.length > 0;
}
