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
    @Input('overflow-tooltip')
    public overflowTooltip: Nullable<boolean | string> = null;

    @Input('filter-type')
    public filterType: Nullable<TableFilterType | string> = null;

    @Input()
    public nowrap: Nullable<boolean | string> = null;

    @Input()
    public width: Nullable<number | string> = null;

    @Input('is-resizable')
    public isResizable: Nullable<boolean | string> = null;

    @Input('is-sortable')
    public isSortable: Nullable<boolean | string> = null;

    @Input('is-filterable')
    public isFilterable: Nullable<boolean | string> = null;

    @Input('is-draggable')
    public isDraggable: Nullable<boolean | string> = null;

    @Input('css-class')
    public cssClass: string[] = [];

    @Input('css-style')
    public cssStyle: string[] = [];

    @Input()
    public stub: Nullable<string> = null;
}
