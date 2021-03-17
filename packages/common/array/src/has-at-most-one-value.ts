export function hasAtMostOneValue<EntryType>(array: EntryType[]): array is [EntryType] | [] {
    return array.length <= 1;
}
