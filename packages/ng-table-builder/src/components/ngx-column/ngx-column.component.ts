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
export class NgxColumnComponent extends ColumnOptions {
    @Input() public key: string | null = null;
    @Input() public stub: string = '-';
    @Input('sticky') public stickyLeft: boolean = false;
    @Input('empty-head') public emptyHead: boolean | null = null;
    @Input('head-title') public headTitle: string | null = null;
    @Input('custom-key') public customKey: boolean | string = false;
    @Input('sticky-end') public stickyRight: boolean = false;
    @Input('vertical-line') public verticalLine: boolean = false;
    @Input('important-template') public importantTemplate: boolean | string = false;
    @Input('overflow-tooltip') public overflowTooltip: boolean | null = null;
    @ContentChild(TemplateHeadThDirective, { static: false }) public th!: TemplateHeadThDirective;
    @ContentChild(TemplateBodyTdDirective, { static: false }) public td!: TemplateBodyTdDirective;

    public withKey(key: string): NgxColumnComponent {
        this.key = key;
        return this;
    }
}
