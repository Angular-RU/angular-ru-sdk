import { Any } from '@angular-ru/common/typings';
import { Directive, Input, Optional, TemplateRef } from '@angular/core';

import { AbstractTemplateCellCommon } from './abstract-template-cell-common.directive';

@Directive({ selector: 'ng-template[ngx-td]' })
export class TemplateBodyTdDirective extends AbstractTemplateCellCommon {
    @Input('ngx-td') public type: string | null = null;

    constructor(@Optional() public template?: TemplateRef<Any>) {
        super(template);
    }
}
