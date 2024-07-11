import {Directive, Inject, Input, TemplateRef} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

@Directive({
    selector: 'ng-template[ngx-filter]',
})
export class NgxFilterDirective {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('ngx-filter')
    public type: Nullable<string> = null;

    constructor(
        @Inject(TemplateRef)
        public template: TemplateRef<unknown>,
    ) {}
}
