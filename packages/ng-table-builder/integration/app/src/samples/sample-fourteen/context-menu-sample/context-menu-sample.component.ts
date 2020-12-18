import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableBuilderComponent } from '@angular-ru/ng-table-builder';

import { FilterStateEvent } from '../../../../../../src/services/filterable/filterable.interface';

@Component({
    selector: 'context-menu-sample',
    templateUrl: './context-menu-sample.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuSampleComponent {
    @Input() public table!: TableBuilderComponent;
    @Input() public state!: Partial<FilterStateEvent>;
}
