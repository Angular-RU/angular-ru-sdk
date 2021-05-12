import { Directive, EventEmitter, Input, Optional, Output, TemplateRef } from '@angular/core';
import { Any, PlainObject } from '@angular-ru/common/typings';

import { TableEvent } from '../../interfaces/table-builder.external';

@Directive()
export abstract class AbstractTemplateCellCommonDirective<T> {
    @Input() public row: string | boolean = false;
    @Input() public bold: boolean = false;
    @Input() public nowrap: boolean = true;
    @Input() public width: number | null = null;
    @Input() public height: number | null = null;
    @Input('ng-style') public cssStyles: PlainObject | null = null;
    @Input('ng-class') public cssClasses: string | string[] | PlainObject | null = null;
    // TODO: should be rename (breaking changes)
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() public readonly onClick: EventEmitter<TableEvent<T | Any, Any>> = new EventEmitter();
    @Output() public readonly dblClick: EventEmitter<TableEvent<T | Any, Any>> = new EventEmitter();
    public type: string | null = null;

    protected constructor(@Optional() public template?: TemplateRef<unknown>) {}
}
