export function hasOneValue<EntryType>(array: EntryType[]): array is [EntryType] {
    return array.length === 1;
}
