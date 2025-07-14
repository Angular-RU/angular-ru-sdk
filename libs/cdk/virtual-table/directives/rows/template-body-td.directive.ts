import {Directive, Input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {AbstractTemplateCellCommonDirective} from './abstract-template-cell-common.directive';

@Directive({selector: 'ng-template[ngx-td]'})
export class TemplateBodyTd<T> extends AbstractTemplateCellCommonDirective<T> {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('ngx-td')
    public override type: Nullable<string> = null;
}
