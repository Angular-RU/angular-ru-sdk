export function hasOneItem<EntryType>(array?: EntryType[] | null): array is [EntryType] {
    return (array ?? []).length === 1;
}
