import { Pipe, PipeTransform } from '@angular/core';
import { Any, PlainObjectOf } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { TableBuilderComponent } from '../table-builder.component';

/**
 * @deprecated Use `table.selectedKeyList` + `mapToTableEntries` instead
 */
@Pipe({ name: 'tableSelectedItems' })
export class TableSelectedItemsPipe<T> implements PipeTransform {
    constructor(private readonly table: TableBuilderComponent<T>) {}

    /**
     * @deprecated Use `table.selectedKeyList` + `mapToTableEntries` instead
     */
    public transform(selectedEntries?: PlainObjectOf<boolean>): T[] {
        const entries: PlainObjectOf<boolean> = selectedEntries ?? this.table.selectionEntries;
        return this.table.originalSourceRef.filter((item: T): boolean =>
            isNotNil(entries[(item as Any)[this.table.primaryKey]])
        );
    }
}
