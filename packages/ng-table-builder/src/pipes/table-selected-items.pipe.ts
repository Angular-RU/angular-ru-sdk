import { Pipe, PipeTransform } from '@angular/core';
import { Any, PlainObjectOf } from '@angular-ru/common/typings';

import { TableRow } from '../interfaces/table-builder.external';
import { TableBuilderComponent } from '../table-builder.component';

@Pipe({ name: 'tableSelectedItems' })
export class TableSelectedItemsPipe implements PipeTransform {
    constructor(private readonly table: TableBuilderComponent) {}

    public transform(selectedEntries?: PlainObjectOf<boolean>): TableRow[] {
        const entries: PlainObjectOf<boolean> = selectedEntries ?? this.table.selectionEntries;
        return this.table.sourceRef.filter(
            (item: TableRow[]): TableRow => entries[(item as Any)[this.table.primaryKey]]
        );
    }
}
