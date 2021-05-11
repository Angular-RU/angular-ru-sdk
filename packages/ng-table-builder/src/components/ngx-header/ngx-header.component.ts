import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TableContentDirective } from '../../directives/table-content.directive';

@Component({
    selector: 'ngx-header',
    templateUrl: './ngx-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxHeaderComponent extends TableContentDirective {}
