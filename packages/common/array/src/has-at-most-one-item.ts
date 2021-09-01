import { Nullable } from '@angular-ru/common/typings';

import { hasManyItems } from './has-many-items';
import { ListType } from './types';

export function hasAtMostOneItem<EntryType>(list?: Nullable<ListType<EntryType>>): boolean {
    return !hasManyItems(list);
}
