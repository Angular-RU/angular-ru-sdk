import { EventEmitter, Input, Optional, Output, TemplateRef } from '@angular/core';

import { TableEvent } from '../../interfaces/table-builder.external';
import { KeyMap } from '../../interfaces/table-builder.internal';

// eslint-disable-next-line
export abstract class TemplateCellCommon {
    public type: string | null = null;
    @Input() public row: boolean = false;
    @Input() public bold: boolean = false;
    @Input() public nowrap: boolean = true;
    @Input() public width: number | null = null;
    @Input() public height: number | null = null;
    @Input('ng-style') public cssStyles: KeyMap | null = null;
    // eslint-disable-next-line @typescript-eslint/tslint/config
    @Input('ng-class') public cssClasses: string | string[] | KeyMap | null = null;
    @Output() public onClick: EventEmitter<TableEvent> = new EventEmitter();
    @Output() public dblClick: EventEmitter<TableEvent> = new EventEmitter();

    protected constructor(@Optional() public template?: TemplateRef<unknown>) {}
}
