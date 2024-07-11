import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {ColumnOptionsDirective} from '../../directives/column-options.directive';

@Component({
    selector: 'ngx-options',
    templateUrl: './ngx-options.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxOptionsComponent extends ColumnOptionsDirective {}
