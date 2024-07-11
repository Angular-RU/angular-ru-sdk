/* eslint-disable @angular-eslint/no-input-rename */
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import {ExcelType} from '@angular-ru/cdk/excel';
import {Nullable} from '@angular-ru/cdk/typings';

import {ColumnOptionsDirective} from '../../directives/column-options.directive';
import {TemplateBodyTdDirective} from '../../directives/rows/template-body-td.directive';
import {TemplateHeadThDirective} from '../../directives/rows/template-head-th.directive';

@Component({
    selector: 'ngx-column',
    templateUrl: './ngx-column.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxColumnComponent<T> extends ColumnOptionsDirective {
    @Input()
    public key: Nullable<string> = null;

    @Input()
    public override stub: Nullable<string> = '-';

    @Input('sticky')
    public stickyLeft: Nullable<boolean | string> = false;

    @Input('empty-head')
    public emptyHead: Nullable<boolean | string> = null;

    @Input('head-title')
    public headTitle: Nullable<string> = null;

    @Input('custom-key')
    public customKey: boolean | string = false;

    @Input('sticky-end')
    public stickyRight: boolean | string = false;

    @Input('vertical-line')
    public verticalLine: boolean | string = false;

    @Input('important-template')
    public importantTemplate: boolean | string = false;

    @Input('force-model')
    public forceModel: Nullable<boolean | string> = null;

    @Input('overflow-tooltip')
    public override overflowTooltip: Nullable<boolean> = null;

    @Input('excel-type')
    public excelType: Nullable<ExcelType> = null;

    @ContentChild(TemplateHeadThDirective, {static: false})
    public th!: TemplateHeadThDirective<T>;

    @ContentChild(TemplateBodyTdDirective, {static: false})
    public td!: TemplateBodyTdDirective<T>;

    public withKey(key: string): NgxColumnComponent<T> {
        this.key = key;

        return this;
    }
}
