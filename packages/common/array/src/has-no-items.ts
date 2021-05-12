export function hasNoItems<EntryType>(array?: EntryType[] | null): array is [] {
    return (array ?? []).length === 0;
}
