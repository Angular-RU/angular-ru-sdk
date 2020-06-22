import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TableContent } from '../common/table-content';

@Component({
    selector: 'ngx-footer',
    templateUrl: './ngx-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxFooterComponent extends TableContent {}
