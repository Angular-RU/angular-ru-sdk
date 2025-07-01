import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {coerceBoolean} from '@angular-ru/cdk/coercion';
import {AttributeBoolean} from '@angular-ru/cdk/decorators';
import {InputBoolean} from '@angular-ru/cdk/typings';

import {TableContentDirective} from '../../directives/table-content.directive';

@Component({
    standalone: false,
    selector: 'ngx-header',
    templateUrl: './ngx-header.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxHeaderComponent extends TableContentDirective {
    @Output()
    public readonly expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @AttributeBoolean() @Input() public expanded: InputBoolean = true;
    @AttributeBoolean() @Input() public expandablePanel: InputBoolean = false;
    @AttributeBoolean() @Input() public hideToggle: InputBoolean = false;

    public toggleExpand(): void {
        this.expanded = !coerceBoolean(this.expanded);
        this.expandedChange.emit(this.expanded);
    }
}
