import { hasNoItems } from './has-no-items';

export function hasItems<EntryType>(array?: EntryType[] | null): array is [EntryType, ...EntryType[]] {
    return !hasNoItems(array);
}
