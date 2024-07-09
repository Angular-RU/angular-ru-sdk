import {Nullable} from '@angular-ru/cdk/typings';

export function hasManyItems<EntryType>(
    array?: Nullable<EntryType[]>,
): array is [EntryType, EntryType, ...EntryType[]] {
    return (array ?? []).length > 1;
}
