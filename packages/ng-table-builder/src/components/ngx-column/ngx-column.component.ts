import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';

import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { ColumnOptions } from '../common/column-options';

@Component({
    selector: 'ngx-column',
    templateUrl: './ngx-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxColumnComponent<T> extends ColumnOptions {
    @Input() public key: string | null = null;
    @Input() public stub: string | null = '-';
    @Input('sticky') public stickyLeft: boolean | string = false;
    @Input('empty-head') public emptyHead: string | boolean | null = null;
    @Input('head-title') public headTitle: string | null = null;
    @Input('custom-key') public customKey: string | boolean = false;
    @Input('sticky-end') public stickyRight: string | boolean = false;
    @Input('vertical-line') public verticalLine: string | boolean = false;
    @Input('important-template') public importantTemplate: string | boolean = false;
    @Input('overflow-tooltip') public overflowTooltip: boolean | null = null;
    @ContentChild(TemplateHeadThDirective, { static: false }) public th!: TemplateHeadThDirective<T>;
    @ContentChild(TemplateBodyTdDirective, { static: false }) public td!: TemplateBodyTdDirective<T>;

    public withKey(key: string): NgxColumnComponent<T> {
        this.key = key;
        return this;
    }
}
