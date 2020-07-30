import { Any } from '@angular-ru/common/typings';
import { Directive, Input, Optional, TemplateRef } from '@angular/core';

import { TemplateCellCommon } from './template-cell.common';

@Directive({ selector: 'ng-template[ngx-td]' })
export class TemplateBodyTdDirective extends TemplateCellCommon {
    @Input('ngx-td') public type: string | null = null;

    constructor(@Optional() public template?: TemplateRef<Any>) {
        super(template);
    }
}
