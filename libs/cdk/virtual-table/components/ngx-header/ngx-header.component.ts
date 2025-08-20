import {NgClass} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
    ViewEncapsulation,
} from '@angular/core';
import {SIGNAL} from '@angular/core/primitives/signals';
import {coerceBoolean} from '@angular-ru/cdk/coercion';
import {InputBoolean} from '@angular-ru/cdk/typings';

import {TableContentDirective} from '../../directives/table-content.directive';

@Component({
    selector: 'ngx-header',
    imports: [NgClass],
    templateUrl: './ngx-header.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxHeader extends TableContentDirective {
    public readonly expandedChange = output<InputBoolean>();

    public readonly expanded = input<boolean, InputBoolean>(true, {
        transform: coerceBoolean,
    });

    public readonly expandablePanel = input<boolean, InputBoolean>(false, {
        transform: coerceBoolean,
    });

    public readonly hideToggle = input<boolean, InputBoolean>(false, {
        transform: coerceBoolean,
    });

    public toggleExpand(): void {
        this.expanded[SIGNAL].value = !coerceBoolean(this.expanded());
        this.expandedChange.emit(this.expanded());
    }
}
