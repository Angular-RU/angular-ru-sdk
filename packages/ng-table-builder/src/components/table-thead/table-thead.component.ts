import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { fadeInLinearAnimation } from '@angular-ru/common/animations';
import { PlainObjectOf, SortOrderType } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { ResizeEvent } from '../../interfaces/table-builder.internal';
import { FilterableService } from '../../services/filterable/filterable.service';
import { OVERLOAD_WIDTH_TABLE_HEAD_CELL } from '../../table-builder.properties';

@Component({
    selector: 'table-thead',
    templateUrl: './table-thead.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [fadeInLinearAnimation]
})
export class TableTheadComponent<T> {
    @Input('header-top') public headerTop: number | null = null;
    @Input('column-width') public columnWidth: number = 0;
    @Input('head-height') public headHeight: string | number | null = null;
    @Input('sortable-definition') public sortableDefinition: PlainObjectOf<SortOrderType> = {};
    @Input('sortable-position') public positionMap: PlainObjectOf<number> = {};
    @Input('sortable-count') public sortableCount: number = 0;
    @Input('filterable-definition') public filterableDefinition: PlainObjectOf<string> | ReadonlyMap<unknown, unknown> =
        {};
    @Input('client-row-height') public clientRowHeight: number | null = null;
    @Input('column-schema') public columnSchema: ColumnsSchema | null = null;
    @Output() public readonly resizing: EventEmitter<ResizeEvent> = new EventEmitter();
    @Output() public readonly sortByKey: EventEmitter<string> = new EventEmitter();
    public orderType: typeof SortOrderType = SortOrderType;
    public limit: number = OVERLOAD_WIDTH_TABLE_HEAD_CELL;

    constructor(protected readonly filterable: FilterableService<T>) {}

    public openFilter(key: string | null | undefined, event: MouseEvent): void {
        if (isNotNil(key)) {
            this.filterable.openFilter(key, event);
        }
    }
}
