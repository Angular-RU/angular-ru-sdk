/* eslint-disable @angular-eslint/no-input-rename */
import {Directive, Input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {TableFilterType} from '../services/filterable/table-filter-type';

/**
 * Global options
 * <ngx-options .../>
 */
@Directive()
export class ColumnOptionsDirective {
    /**
     * preserve track global value for overflowTooltip if selected
     */
    @Input('overflow-tooltip') public overflowTooltip: Nullable<string | boolean> = null;
    @Input('filter-type') public filterType: Nullable<string | TableFilterType> = null;
    @Input() public nowrap: Nullable<string | boolean> = null;
    @Input() public width: Nullable<string | number> = null;
    @Input('is-resizable') public isResizable: Nullable<string | boolean> = null;
    @Input('is-sortable') public isSortable: Nullable<string | boolean> = null;
    @Input('is-filterable') public isFilterable: Nullable<string | boolean> = null;
    @Input('is-draggable') public isDraggable: Nullable<string | boolean> = null;
    @Input('css-class') public cssClass: string[] = [];
    @Input('css-style') public cssStyle: string[] = [];
    @Input() public stub: Nullable<string> = null;
}
