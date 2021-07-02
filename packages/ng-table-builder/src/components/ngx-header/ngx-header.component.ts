import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { coerceBoolean } from '@angular-ru/common/coercion';
import { AttributeBoolean } from '@angular-ru/common/decorators';
import { InputBoolean } from '@angular-ru/common/typings';

import { TableContentDirective } from '../../directives/table-content.directive';

@Component({
    selector: 'ngx-header',
    templateUrl: './ngx-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxHeaderComponent extends TableContentDirective {
    @Output() public readonly expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @AttributeBoolean() @Input() public expanded: InputBoolean = true;
    @AttributeBoolean() @Input() public expandable: InputBoolean = false;

    public toggleExpand(): void {
        this.expanded = !coerceBoolean(this.expanded);
        this.expandedChange.emit(this.expanded);
    }
}
