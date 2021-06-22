import { Nullable } from '@angular-ru/common/typings';

import { hasNoItems } from './has-no-items';

export function hasItems<EntryType>(array?: Nullable<EntryType[]>): array is [EntryType, ...EntryType[]] {
    return !hasNoItems(array);
}
