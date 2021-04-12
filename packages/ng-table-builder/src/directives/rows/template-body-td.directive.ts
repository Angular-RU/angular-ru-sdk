import { Directive, Input, Optional, TemplateRef } from '@angular/core';
import { Any } from '@angular-ru/common/typings';

import { AbstractTemplateCellCommonDirective } from './abstract-template-cell-common.directive';

@Directive({ selector: 'ng-template[ngx-td]' })
export class TemplateBodyTdDirective<T> extends AbstractTemplateCellCommonDirective<T> {
    @Input('ngx-td') public type: string | null = null;

    constructor(@Optional() public template?: TemplateRef<Any>) {
        super(template);
    }
}
