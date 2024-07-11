import {Nullable} from '@angular-ru/cdk/typings';

import {hasManyItems} from './has-many-items';

export function hasAtMostOneItem<EntryType>(
    array?: Nullable<EntryType[]>,
): array is [] | [EntryType] {
    return !hasManyItems(array);
}
