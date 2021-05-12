import { Directive, Input } from '@angular/core';

import { TableFilterType } from '../services/filterable/table-filter-type';

/**
 * Global options
 * <ngx-options .../>
 */
@Directive()
export class ColumnOptionsDirective {
    /**
     * preserve track global value for overflowTooltip if selected
     */
    @Input('overflow-tooltip') public overflowTooltip: string | boolean | null | undefined = null;
    @Input('filter-type') public filterType: string | TableFilterType | null | undefined = null;
    @Input() public nowrap: string | boolean | null | undefined = null;
    @Input() public width: string | number | null | undefined = null;
    @Input('is-resizable') public isResizable: string | boolean | null | undefined = null;
    @Input('is-sortable') public isSortable: string | boolean | null | undefined = null;
    @Input('is-filterable') public isFilterable: string | boolean | null | undefined = null;
    @Input('is-draggable') public isDraggable: string | boolean | null | undefined = null;
    @Input('css-class') public cssClass: string[] = [];
    @Input('css-style') public cssStyle: string[] = [];
    @Input() public stub: string | null | undefined = null;
}
