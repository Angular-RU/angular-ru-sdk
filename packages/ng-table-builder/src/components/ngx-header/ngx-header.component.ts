import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TableContent } from '../common/table-content';

@Component({
    selector: 'ngx-header',
    templateUrl: './ngx-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxHeaderComponent extends TableContent {}
