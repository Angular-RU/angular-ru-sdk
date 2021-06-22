import { Nullable } from '@angular-ru/common/typings';

export function hasOneItem<EntryType>(array?: Nullable<EntryType[]>): array is [EntryType] {
    return (array ?? []).length === 1;
}
