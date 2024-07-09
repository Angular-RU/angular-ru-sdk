import {Pipe, PipeTransform} from '@angular/core';
import {PlainObjectOf} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {TableBuilderComponent} from '../table-builder.component';

/**
 * @deprecated Use `table.selectedKeyList` + `mapToTableEntries` instead
 */
@Pipe({name: 'tableSelectedItems'})
export class TableSelectedItemsPipe<T> implements PipeTransform {
    constructor(private readonly table: TableBuilderComponent<T>) {}

    /**
     * @deprecated Use `table.selectedKeyList` + `mapToTableEntries` instead
     */
    public transform(selectedEntries?: PlainObjectOf<boolean>): T[] {
        // eslint-disable-next-line deprecation/deprecation
        const entries: PlainObjectOf<boolean> =
            selectedEntries ?? this.table.selectionEntries;

        return this.table.originalSourceRef.filter((item: T): boolean =>
            isNotNil(entries[(item as any)[this.table.primaryKey]]),
        );
    }
}
