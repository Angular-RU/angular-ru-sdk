import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {TableContentDirective} from '../../directives/table-content.directive';

@Component({
    selector: 'ngx-footer',
    templateUrl: './ngx-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class NgxFooterComponent extends TableContentDirective {}
