import { Directive, Input } from '@angular/core';

import { TableFilterType } from '../../services/filterable/filterable.interface';

/**
 * Global options
 * <ngx-options .../>
 */
@Directive()
export class ColumnOptionsDirective {
    /**
     * preserve track global value for overflowTooltip if selected
     */
    @Input('overflow-tooltip') public overflowTooltip: string | boolean | null = null;
    @Input('filter-type') public filterType: string | TableFilterType | null = null;
    @Input() public nowrap: string | boolean | null = null;
    @Input() public width: string | number | null = null;
    @Input('is-resizable') public isResizable: string | boolean | null = null;
    @Input('is-sortable') public isSortable: string | boolean | null = null;
    @Input('is-filterable') public isFilterable: string | boolean | null = null;
    @Input('is-draggable') public isDraggable: string | boolean | null = null;
    @Input('css-class') public cssClass: string[] = [];
    @Input('css-style') public cssStyle: string[] = [];
    @Input() public stub: string | null = null;
}
