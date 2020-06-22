import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ColumnOptions } from '../common/column-options';

@Component({
    selector: 'ngx-options',
    templateUrl: './ngx-options.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxOptionsComponent extends ColumnOptions {}
