import { Directive, Input, Optional, TemplateRef } from '@angular/core';
import { Any } from '@angular-ru/common/typings';

import { AbstractTemplateCellCommon } from './abstract-template-cell-common.directive';

@Directive({ selector: 'ng-template[ngx-th]' })
export class TemplateHeadThDirective extends AbstractTemplateCellCommon {
    @Input('ngx-th') public type: string | null = null;
    public nowrap: boolean = false;

    constructor(@Optional() public template?: TemplateRef<Any>) {
        super(template);
        this.bold = true;
    }
}
