import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[ngx-filter]' })
export class NgxFilterDirective {
    @Input('ngx-filter') public type: string | null = null;
    constructor(public template: TemplateRef<unknown>) {}
}
