export function hasManyItems<EntryType>(array?: EntryType[] | null): array is [EntryType, EntryType, ...EntryType[]] {
    return (array ?? []).length > 1;
}
