import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableBuilderComponent } from '@angular-ru/common/virtual-table';

import { FilterStateEvent } from '../../../../../../../virtual-table/src/services/filterable/filter-state-event';

@Component({
    selector: 'context-menu-sample',
    templateUrl: './context-menu-sample.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuSampleComponent<T> {
    @Input() public table!: TableBuilderComponent<T>;
    @Input() public state!: Partial<FilterStateEvent>;
}
