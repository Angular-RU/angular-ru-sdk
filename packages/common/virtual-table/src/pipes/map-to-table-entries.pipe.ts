import { Pipe, PipeTransform } from '@angular/core';
import { Any, Nullable } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { RowId } from '../interfaces/table-builder.internal';
import { TableBuilderComponent } from '../table-builder.component';

@Pipe({ name: 'mapToTableEntries' })
export class MapToTableEntriesPipe<T> implements PipeTransform {
    constructor(private readonly table: TableBuilderComponent<T>) {}

    public transform(selectedEntries?: RowId[]): T[] {
        const entries: RowId[] = selectedEntries ?? this.table.selectedKeyList;
        return this.filterItems(entries);
    }

    private filterItems(selectedEntries: RowId[]): T[] {
        const filteredEntriesMap: Map<RowId, Nullable<T>> = new Map();
        selectedEntries.forEach((rowId: RowId): void => void filteredEntriesMap.set(rowId, null));

        let itemsToFindLeft: number = filteredEntriesMap.size;

        for (const item of this.table.originalSourceRef) {
            const rowId: RowId = (item as Any)[this.table.primaryKey];
            if (selectedEntries.includes(rowId)) {
                filteredEntriesMap.set(rowId, item);
                itemsToFindLeft--;
            }
            if (itemsToFindLeft === 0) {
                break;
            }
        }
        return Array.from(filteredEntriesMap.values()).filter(isNotNil);
    }
}
