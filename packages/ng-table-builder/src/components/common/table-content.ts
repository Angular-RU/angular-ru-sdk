import { Input } from '@angular/core';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';

export class TableContent {
    @Input() public height: number = TABLE_GLOBAL_OPTIONS.ROW_HEIGHT;
    @Input('content-cell') public contentCell: boolean | null = null;
    @Input('align-center') public alignCenter: boolean | null = null;
    @Input('css-class') public cssClasses: string[] = [];
    @Input() public bold: boolean | null = null;
}
