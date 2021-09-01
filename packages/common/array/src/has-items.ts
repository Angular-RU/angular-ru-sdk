import { Nullable } from '@angular-ru/common/typings';

import { hasNoItems } from './has-no-items';
import { ListType } from './types';

export function hasItems<EntryType>(list?: Nullable<ListType<EntryType>>): boolean {
    return !hasNoItems(list);
}
