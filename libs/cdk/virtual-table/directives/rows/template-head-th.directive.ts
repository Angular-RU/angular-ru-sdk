import {Directive, Input, Optional, TemplateRef} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {AbstractTemplateCellCommonDirective} from './abstract-template-cell-common.directive';

@Directive({selector: 'ng-template[ngx-th]'})
export class TemplateHeadThDirective<T> extends AbstractTemplateCellCommonDirective<T> {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('ngx-th') public override type: Nullable<string> = null;
    public override nowrap: boolean = false;

    constructor(@Optional() public override template?: TemplateRef<any>) {
        super(template);
        this.bold = true;
    }
}
