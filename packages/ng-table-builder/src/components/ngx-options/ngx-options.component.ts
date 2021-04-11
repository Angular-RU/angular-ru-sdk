import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ColumnOptionsDirective } from '../common/column-options.directive';

@Component({
    selector: 'ngx-options',
    templateUrl: './ngx-options.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxOptionsComponent extends ColumnOptionsDirective {}
