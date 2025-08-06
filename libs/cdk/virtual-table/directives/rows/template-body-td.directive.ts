import {Directive, input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {AbstractTemplateCellCommonDirective} from './abstract-template-cell-common.directive';

@Directive({selector: 'ng-template[ngx-td]'})
export class TemplateBodyTd<T> extends AbstractTemplateCellCommonDirective<T> {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public override readonly type = input<Nullable<string>>(null, {alias: 'ngx-td'});
}
