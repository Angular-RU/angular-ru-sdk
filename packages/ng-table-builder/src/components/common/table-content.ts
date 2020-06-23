import { Input } from '@angular/core';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';

export class TableContent {
    @Input() public height: string | number = TABLE_GLOBAL_OPTIONS.ROW_HEIGHT;
    // eslint-disable-next-line @typescript-eslint/tslint/config
    @Input('content-cell') public contentCell: string | boolean | null = null;
    @Input('align-center') public alignCenter: string | boolean | null = null;
    @Input('css-class') public cssClasses: string[] = [];
    @Input() public bold: string | boolean | null = null;
}
