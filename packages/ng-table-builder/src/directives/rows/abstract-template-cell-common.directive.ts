import { Directive, EventEmitter, Input, Optional, Output, TemplateRef } from '@angular/core';
import { Any, PlainObject } from '@angular-ru/common/typings';

import { TableEvent } from '../../interfaces/table-builder.external';

@Directive()
export abstract class AbstractTemplateCellCommon<T> {
    public type: string | null = null;
    @Input() public row: string | boolean = false;
    @Input() public bold: boolean = false;
    @Input() public nowrap: boolean = true;
    @Input() public width: number | null = null;
    @Input() public height: number | null = null;
    @Input('ng-style') public cssStyles: PlainObject | null = null;
    @Input('ng-class') public cssClasses: string | string[] | PlainObject | null = null;
    @Output() public onClick: EventEmitter<TableEvent<T | Any, Any>> = new EventEmitter();
    @Output() public dblClick: EventEmitter<TableEvent<T | Any, Any>> = new EventEmitter();

    protected constructor(@Optional() public template?: TemplateRef<unknown>) {}
}
