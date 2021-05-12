import { hasManyItems } from './has-many-items';

export function hasAtMostOneItem<EntryType>(array?: EntryType[] | null): array is [EntryType] | [] {
    return !hasManyItems(array);
}
