import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FilterStateEvent, TableBuilderComponent, TableFilterType } from '@angular-ru/cdk/virtual-table';

import { Nullable } from '../../../../../../libs/cdk/typings/src/public_api';

@Component({
    selector: 'context-menu-sample',
    templateUrl: './context-menu-sample.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuSampleComponent<T> {
    @Input() public table!: TableBuilderComponent<T>;
    @Input() public state!: Partial<FilterStateEvent>;

    public TableFilterType: typeof TableFilterType = TableFilterType;
    public dateRange: Nullable<Date>[] = [null, null];

    public changeDateRange(): void {
        if (this.dateRange[0] || this.dateRange[1]) {
            this.table.filterable.updateFilterValueBy(this.dateRange, this.state.key);
        } else {
            this.table.filterable.updateFilterValueBy(null, this.state.key);
        }

        this.table.filter();
    }

    public updateFilterType(event: unknown): void {
        this.table.filterable.updateFilterTypeBy(event as any, this.state.key);
        this.table.filter();
    }
}
