/* eslint-disable @angular-eslint/no-input-rename */
import {Directive, EventEmitter, inject, Input, Output, TemplateRef} from '@angular/core';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';

import {TableEvent} from '../../interfaces/table-builder.external';

@Directive()
export abstract class AbstractTemplateCellCommonDirective<T> {
    public readonly template = inject(TemplateRef<unknown>, {optional: true});

    @Input()
    public row: boolean | string = false;

    @Input()
    public bold = false;

    @Input()
    public nowrap = true;

    @Input()
    public width: Nullable<number> = null;

    @Input()
    public height: Nullable<number> = null;

    @Input('ng-style')
    public cssStyles: Nullable<PlainObject> = null;

    @Input('ng-class')
    public cssClasses: Nullable<PlainObject | string[] | string> = null;

    // TODO: should be rename (breaking changes)
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output()
    public readonly onClick = new EventEmitter<TableEvent<T | any, any>>();

    @Output()
    public readonly dblClick = new EventEmitter<TableEvent<T | any, any>>();

    public type: Nullable<string> = null;
}
