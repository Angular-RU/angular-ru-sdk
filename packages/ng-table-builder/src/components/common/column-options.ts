import { Input } from '@angular/core';

import { TableFilterType } from '../../services/filterable/filterable.interface';

/**
 * Global options
 * <ngx-options .../>
 */
export class ColumnOptions {
    /**
     * preserve track global value for overflowTooltip if selected
     */
    @Input('overflow-tooltip') public overflowTooltip: boolean | null = null;
    @Input('filter-type') public filterType: TableFilterType | null = null;
    @Input() public nowrap: boolean | null = null;
    @Input() public width: number | null = null;
    @Input('is-resizable') public isResizable: boolean | null = null;
    @Input('is-sortable') public isSortable: boolean | null = null;
    @Input('is-filterable') public isFilterable: boolean | null = null;
    @Input('is-draggable') public isDraggable: boolean | null = null;
    @Input('css-class') public cssClass: string[] = [];
    @Input('css-style') public cssStyle: string[] = [];
    @Input() public stub: string | null = null;
}
