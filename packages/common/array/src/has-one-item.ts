import { Nullable } from '@angular-ru/common/typings';

import { ListType } from './types';

export function hasOneItem<EntryType>(list?: Nullable<ListType<EntryType>>): boolean {
    if (Array.isArray(list)) {
        return (list ?? []).length === 1;
    }
    if (list instanceof Set || list instanceof Map) {
        return list.size === 1;
    }
    return false;
}
