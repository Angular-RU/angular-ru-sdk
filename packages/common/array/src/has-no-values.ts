export function hasNoValues<EntryType>(array: EntryType[]): array is [] {
    return array.length === 0;
}
