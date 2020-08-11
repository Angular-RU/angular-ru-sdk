import { Pipe, PipeTransform } from '@angular/core';

import { TableBuilderComponent } from '../table-builder.component';

@Pipe({ name: 'countSelectedItems' })
export class SelectedItemsPipe implements PipeTransform {
    public transform(table: TableBuilderComponent): number {
        return table.selection.selectionModel.size;
    }
}
