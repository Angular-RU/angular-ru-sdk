import { Directive, Input, Optional, TemplateRef } from '@angular/core';
import { Any, Nullable } from '@angular-ru/common/typings';

import { AbstractTemplateCellCommonDirective } from './abstract-template-cell-common.directive';

@Directive({ selector: 'ng-template[ngx-th]' })
export class TemplateHeadThDirective<T> extends AbstractTemplateCellCommonDirective<T> {
    @Input('ngx-th') public type: Nullable<string> = null;
    public nowrap: boolean = false;

    constructor(@Optional() public template?: TemplateRef<Any>) {
        super(template);
        this.bold = true;
    }
}
