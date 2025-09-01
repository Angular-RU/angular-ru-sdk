/* eslint-disable @angular-eslint/no-input-rename */
import {Directive, input} from '@angular/core';
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
    public readonly overflowTooltip = input<Nullable<boolean | string>>(null, {
        alias: 'overflow-tooltip',
    });

    public readonly filterType = input<Nullable<TableFilterType | string>>(null, {
        alias: 'filter-type',
    });

    public readonly nowrap = input<Nullable<boolean | string>>(null);

    public readonly width = input<Nullable<number | string>>(null);

    public readonly isResizable = input<Nullable<boolean | string>>(null, {
        alias: 'is-resizable',
    });

    public readonly isSortable = input<Nullable<boolean | string>>(null, {
        alias: 'is-sortable',
    });

    public readonly isFilterable = input<Nullable<boolean | string>>(null, {
        alias: 'is-filterable',
    });

    public readonly isDraggable = input<Nullable<boolean | string>>(null, {
        alias: 'is-draggable',
    });

    public readonly cssClass = input<string[]>([], {alias: 'css-class'});

    public readonly cssStyle = input<string[]>([], {alias: 'css-style'});

    public readonly stub = input<Nullable<string>>(null);
}
