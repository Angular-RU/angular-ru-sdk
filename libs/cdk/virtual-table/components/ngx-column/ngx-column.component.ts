/* eslint-disable @angular-eslint/no-input-rename */
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    input,
    ViewEncapsulation,
} from '@angular/core';
import {SIGNAL} from '@angular/core/primitives/signals';
import {ExcelType} from '@angular-ru/cdk/excel';
import {Nullable} from '@angular-ru/cdk/typings';

import {ColumnOptionsDirective} from '../../directives/column-options.directive';
import {TemplateBodyTd} from '../../directives/rows/template-body-td.directive';
import {TemplateHeadTh} from '../../directives/rows/template-head-th.directive';

@Component({
    selector: 'ngx-column',
    templateUrl: './ngx-column.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxColumn<T> extends ColumnOptionsDirective {
    public readonly key = input<Nullable<string>>(null);

    public override readonly stub = input<Nullable<string>>('-');

    public readonly stickyLeft = input<Nullable<boolean | string>>(false, {
        alias: 'sticky',
    });

    public readonly emptyHead = input<Nullable<boolean | string>>(null, {
        alias: 'empty-head',
    });

    public readonly headTitle = input<Nullable<string>>(null, {alias: 'head-title'});

    public readonly customKey = input<boolean | string>(false, {alias: 'custom-key'});

    public readonly stickyRight = input<boolean | string>(false, {alias: 'sticky-end'});

    public readonly verticalLine = input<boolean | string>(false, {
        alias: 'vertical-line',
    });

    public readonly importantTemplate = input<boolean | string>(false, {
        alias: 'important-template',
    });

    public readonly forceModel = input<Nullable<boolean | string>>(null, {
        alias: 'force-model',
    });

    public override readonly overflowTooltip = input<Nullable<boolean | string>>(null, {
        alias: 'overflow-tooltip',
    });

    public readonly excelType = input<Nullable<ExcelType>>(null, {alias: 'excel-type'});

    @ContentChild(TemplateHeadTh, {static: false})
    public th!: TemplateHeadTh<T>;

    @ContentChild(TemplateBodyTd, {static: false})
    public td!: TemplateBodyTd<T>;

    public withKey(key: string): NgxColumn<T> {
        this.key[SIGNAL].value = key;

        return this;
    }
}
