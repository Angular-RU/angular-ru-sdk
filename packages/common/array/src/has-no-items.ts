import { Nullable } from '@angular-ru/common/typings';

import { ListType } from './types';

export function hasNoItems<EntryType>(list?: Nullable<ListType<EntryType>>): boolean {
    if (Array.isArray(list)) {
        return (list ?? []).length === 0;
    }
    if (list instanceof Set || list instanceof Map) {
        return list.size === 0;
    }
    return true;
}
