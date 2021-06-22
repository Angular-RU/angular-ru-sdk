import { Nullable } from '@angular-ru/common/typings';

export function hasNoItems<EntryType>(array?: Nullable<EntryType[]>): array is [] {
    return (array ?? []).length === 0;
}
