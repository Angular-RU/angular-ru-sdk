import { Directive, Input, TemplateRef } from '@angular/core';
import { Nullable } from '@angular-ru/common/typings';

@Directive({
    selector: 'ng-template[ngx-filter]'
})
export class NgxFilterDirective {
    @Input('ngx-filter') public type: Nullable<string> = null;
    constructor(public template: TemplateRef<unknown>) {}
}
