import {Directive, inject, input, TemplateRef} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

@Directive({selector: 'ng-template[ngx-filter]'})
export class NgxFilterDirective {
    public template = inject<TemplateRef<unknown>>(TemplateRef);

    // eslint-disable-next-line @angular-eslint/no-input-rename
    public readonly type = input<Nullable<string>>(null, {alias: 'ngx-filter'});
}
