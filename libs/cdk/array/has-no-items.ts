import {Nullable} from '@angular-ru/cdk/typings';

export function hasNoItems<EntryType>(array?: Nullable<EntryType[]>): array is [] {
    return (array ?? []).length === 0;
}
