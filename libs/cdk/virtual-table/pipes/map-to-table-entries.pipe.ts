import {inject, Pipe, PipeTransform} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {RowId} from '../interfaces/table-builder.internal';
import {TableBuilder} from '../table-builder.component';

@Pipe({name: 'mapToTableEntries'})
export class MapToTableEntriesPipe<T> implements PipeTransform {
    private readonly table = inject<TableBuilder<T>>(TableBuilder);

    public transform(selectedEntries?: RowId[]): T[] {
        const entries: RowId[] = selectedEntries ?? this.table.selectedKeyList;

        return this.filterItems(entries);
    }

    private filterItems(selectedEntries: RowId[]): T[] {
        const filteredEntriesMap = new Map<RowId, Nullable<T>>();

        for (const rowId of selectedEntries) {
            filteredEntriesMap.set(rowId, null);
        }

        let itemsToFindLeft: number = filteredEntriesMap.size;

        for (const item of this.table.originalSourceRef) {
            const rowId: RowId = (item as any)[this.table.primaryKey()];

            if (selectedEntries.includes(rowId)) {
                filteredEntriesMap.set(rowId, item);
                itemsToFindLeft--;
            }

            if (itemsToFindLeft === 0) {
                break;
            }
        }

        return Array.from(filteredEntriesMap.values()).filter(
            (element: Nullable<T>): element is T => isNotNil(element),
        );
    }
}
