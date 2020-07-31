import { PlainObjectOf } from '@angular-ru/common/typings';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { NGX_ANIMATION } from '../../animations/fade.animation';
import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { ResizeEvent } from '../../interfaces/table-builder.internal';
import { FilterableService } from '../../services/filterable/filterable.service';
import { SortOrderType } from '../../services/sortable/sortable.interfaces';
import { OVERLOAD_WIDTH_TABLE_HEAD_CELL } from '../../symbols';

@Component({
    selector: 'table-thead',
    templateUrl: './table-thead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableTheadComponent {
    @Input('header-top') public headerTop: number | null = null;
    @Input('column-width') public columnWidth: number = 0;
    @Input('head-height') public headHeight: string | number | null = null;
    @Input('sortable-definition') public sortableDefinition: PlainObjectOf<SortOrderType> = {};
    @Input('sortable-position') public positionMap: PlainObjectOf<number> = {};
    @Input('sortable-count') public sortableCount: number = 0;
    @Input('filterable-definition') public filterableDefinition: PlainObjectOf<string> = {};
    @Input('client-row-height') public clientRowHeight: number | null = null;
    @Input('column-schema') public columnSchema: ColumnsSchema | null = null;
    @Output() public resize: EventEmitter<ResizeEvent> = new EventEmitter();
    @Output() public sortByKey: EventEmitter<string> = new EventEmitter();
    public orderType: typeof SortOrderType = SortOrderType;
    public limit: number = OVERLOAD_WIDTH_TABLE_HEAD_CELL;

    constructor(protected readonly filterable: FilterableService) {}

    public openFilter(key: string | null | undefined, event: MouseEvent): void {
        if (key) {
            this.filterable.openFilter(key, event);
        }
    }
}
