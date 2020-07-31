import { Any } from '@angular-ru/common/typings';
import { Directive, Input, Optional, TemplateRef } from '@angular/core';

import { TemplateCellCommon } from './template-cell.common';

@Directive({ selector: 'ng-template[ngx-th]' })
export class TemplateHeadThDirective extends TemplateCellCommon {
    @Input('ngx-th') public type: string | null = null;
    public nowrap: boolean = false;

    constructor(@Optional() public template?: TemplateRef<Any>) {
        super(template);
        this.bold = true;
    }
}
