/* eslint-disable @angular-eslint/no-input-rename */
import {Directive, input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {TABLE_GLOBAL_OPTIONS} from '../config/table-global-options';

@Directive()
export class TableContentDirective {
    public readonly height = input<number | string>(TABLE_GLOBAL_OPTIONS.ROW_HEIGHT);

    public readonly contentCell = input<Nullable<boolean | string>>(null, {
        alias: 'content-cell',
    });

    public readonly alignCenter = input<Nullable<boolean | string>>(null, {
        alias: 'align-center',
    });

    public readonly cssClasses = input<string[]>([], {alias: 'css-class'});

    public readonly bold = input<Nullable<boolean | string>>(null);
}
