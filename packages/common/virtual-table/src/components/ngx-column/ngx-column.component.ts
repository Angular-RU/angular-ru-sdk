import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@angular-ru/common/typings';

import { ColumnOptionsDirective } from '../../directives/column-options.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';

@Component({
    selector: 'ngx-column',
    templateUrl: './ngx-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxColumnComponent<T> extends ColumnOptionsDirective {
    @Input() public key: Nullable<string> = null;
    @Input() public stub: Nullable<string> = '-';
    @Input('sticky') public stickyLeft: Nullable<boolean | string> = false;
    @Input('empty-head') public emptyHead: Nullable<string | boolean> = null;
    @Input('head-title') public headTitle: Nullable<string> = null;
    @Input('custom-key') public customKey: string | boolean = false;
    @Input('sticky-end') public stickyRight: string | boolean = false;
    @Input('vertical-line') public verticalLine: string | boolean = false;
    @Input('important-template') public importantTemplate: string | boolean = false;
    @Input('overflow-tooltip') public overflowTooltip: Nullable<boolean> = null;
    @ContentChild(TemplateHeadThDirective, { static: false }) public th!: TemplateHeadThDirective<T>;
    @ContentChild(TemplateBodyTdDirective, { static: false }) public td!: TemplateBodyTdDirective<T>;

    public withKey(key: string): NgxColumnComponent<T> {
        this.key = key;
        return this;
    }
}
