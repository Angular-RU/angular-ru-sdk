import { Directive, Input } from '@angular/core';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';

@Directive()
export class TableContentDirective {
    @Input() public height: string | number = TABLE_GLOBAL_OPTIONS.ROW_HEIGHT;
    @Input('content-cell') public contentCell: string | boolean | null = null;
    @Input('align-center') public alignCenter: string | boolean | null = null;
    @Input('css-class') public cssClasses: string[] = [];
    @Input() public bold: string | boolean | null = null;
}
