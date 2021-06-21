import { Directive, EventEmitter, Input, Optional, Output, TemplateRef } from '@angular/core';
import { Any, Nullable, PlainObject } from '@angular-ru/common/typings';

import { TableEvent } from '../../interfaces/table-builder.external';

@Directive()
export abstract class AbstractTemplateCellCommonDirective<T> {
    @Input() public row: string | boolean = false;
    @Input() public bold: boolean = false;
    @Input() public nowrap: boolean = true;
    @Input() public width: Nullable<number> = null;
    @Input() public height: Nullable<number> = null;
    @Input('ng-style') public cssStyles: Nullable<PlainObject> = null;
    @Input('ng-class') public cssClasses: Nullable<string | string[] | PlainObject> = null;
    // TODO: should be rename (breaking changes)
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() public readonly onClick: EventEmitter<TableEvent<T | Any, Any>> = new EventEmitter();
    @Output() public readonly dblClick: EventEmitter<TableEvent<T | Any, Any>> = new EventEmitter();
    public type: Nullable<string> = null;

    protected constructor(@Optional() public template?: TemplateRef<unknown>) {}
}
