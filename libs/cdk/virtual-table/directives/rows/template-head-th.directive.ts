import {Directive, input} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {AbstractTemplateCellCommonDirective} from './abstract-template-cell-common.directive';

@Directive({selector: 'ng-template[ngx-th]'})
export class TemplateHeadTh<T> extends AbstractTemplateCellCommonDirective<T> {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    public override readonly type = input<Nullable<string>>(null, {alias: 'ngx-th'});

    public override readonly bold = input(true);

    public override nowrap = input(false);
}
