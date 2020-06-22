import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { NGX_ANIMATION } from '../../animations/fade.animation';
import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { KeyMap, ResizeEvent } from '../../interfaces/table-builder.internal';
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
    @Input('sortable-definition') public sortableDefinition: KeyMap<SortOrderType> = {};
    @Input('sortable-position') public positionMap: KeyMap<number> = {};
    @Input('sortable-count') public sortableCount: number = 0;
    @Input('filterable-definition') public filterableDefinition: KeyMap<string> = {};
    @Input('client-row-height') public clientRowHeight: number | null = null;
    @Input('column-schema') public columnSchema: ColumnsSchema | null = null;
    @Output() public resize: EventEmitter<ResizeEvent> = new EventEmitter();
    @Output() public sortByKey: EventEmitter<string> = new EventEmitter();
    public orderType: typeof SortOrderType = SortOrderType;
    public limit: number = OVERLOAD_WIDTH_TABLE_HEAD_CELL;

    constructor(protected readonly filterable: FilterableService) {}

    public openFilter(key: string, event: MouseEvent): void {
        this.filterable.openFilter(key, event);
    }
}
