export function hasManyValues<EntryType>(array: EntryType[]): array is [EntryType, EntryType, ...EntryType[]] {
    return array.length > 1;
}
