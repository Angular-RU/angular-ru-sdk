/* eslint-disable @angular-eslint/no-input-rename */
import type {Signal} from '@angular/core';
import {
    Directive,
    EventEmitter,
    inject,
    input,
    Output,
    signal,
    TemplateRef,
} from '@angular/core';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';

import {TableEvent} from '../../interfaces/table-builder.external';

@Directive()
export abstract class AbstractTemplateCellCommonDirective<T> {
    public readonly template = inject(TemplateRef<unknown>, {optional: true});

    public readonly row = input<boolean | string>(false);
    public readonly bold = input(false);
    public readonly nowrap = input(true);
    public readonly width = input<Nullable<number>>(null);
    public readonly height = input<Nullable<number>>(null);
    public readonly cssStyles = input<Nullable<PlainObject>>(null, {alias: 'ng-style'});
    public readonly cssClasses = input<Nullable<PlainObject | string[] | string>>(null, {
        alias: 'ng-class',
    });

    // TODO: should be rename (breaking changes)
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output()
    public readonly onClick = new EventEmitter<TableEvent<T | any, any>>();

    @Output()
    public readonly dblClick = new EventEmitter<TableEvent<T | any, any>>();

    public type: Signal<Nullable<string>> = signal(null);
}
