import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { AttributeBoolean } from '@angular-ru/common/decorators';

import { TableContentDirective } from '../../directives/table-content.directive';

@Component({
    selector: 'ngx-header',
    templateUrl: './ngx-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxHeaderComponent extends TableContentDirective {
    @Output() public readonly expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @AttributeBoolean() @Input() public expanded: boolean = true;
    @AttributeBoolean() @Input() public expandable: boolean = false;

    public toggleExpand(): void {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }
}
