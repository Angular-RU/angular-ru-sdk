import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {TableContentDirective} from '../../directives/table-content.directive';

@Component({
    selector: 'ngx-footer',
    templateUrl: './ngx-footer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxFooterComponent extends TableContentDirective {}
