import {takeFirstItem} from '@angular-ru/cdk/array';
import {Nullable, PlainObjectOf} from '@angular-ru/cdk/typings';

import {SelectFromTableResult} from '../interfaces/select-from-table-result';
import {TableBuilder} from '../table-builder.component';

export function selectFromTableBy<T>(
    entries: PlainObjectOf<boolean> | T[],
    table?: TableBuilder<T>,
): SelectFromTableResult<T> {
    const selectedItems: T[] = Array.isArray(entries)
        ? entries
        : (table?.selectedItems ?? []);
    const firstSelected: Nullable<T> = takeFirstItem(selectedItems);

    return {items: selectedItems, first: firstSelected};
}
