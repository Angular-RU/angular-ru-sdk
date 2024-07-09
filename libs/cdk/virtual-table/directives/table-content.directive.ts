/* eslint-disable @angular-eslint/no-input-rename */
import {Directive, Input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {TABLE_GLOBAL_OPTIONS} from '../config/table-global-options';

@Directive()
export class TableContentDirective {
    @Input() public height: string | number = TABLE_GLOBAL_OPTIONS.ROW_HEIGHT;
    @Input('content-cell') public contentCell: Nullable<string | boolean> = null;
    @Input('align-center') public alignCenter: Nullable<string | boolean> = null;
    @Input('css-class') public cssClasses: string[] = [];
    @Input() public bold: Nullable<string | boolean> = null;
}
