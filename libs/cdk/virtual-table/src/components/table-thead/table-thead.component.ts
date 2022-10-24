/* eslint-disable @angular-eslint/no-input-rename */
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { fadeInLinearAnimation } from '@angular-ru/cdk/animations';
import { Nullable, PlainObjectOf, SortOrderType } from '@angular-ru/cdk/typings';
import { isNotNil, isTrue } from '@angular-ru/cdk/utils';

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
    @Input('column-width') public columnWidth: number = 0;
    @Input('head-height') public headHeight: Nullable<string | number> = null;
    @Input('sortable-definition') public sortableDefinition: PlainObjectOf<SortOrderType> = {};
    @Input('sortable-position') public positionMap: PlainObjectOf<number> = {};
    @Input('sortable-count') public sortableCount: number = 0;
    @Input('filterable-definition') public filterableDefinition: PlainObjectOf<string> | ReadonlyMap<unknown, unknown> =
        {};

    @Input('client-row-height') public clientRowHeight: Nullable<number> = null;
    @Input('column-schema') public columnSchema: Nullable<ColumnsSchema> = null;
    @Output() public readonly resizing: EventEmitter<ResizeEvent> = new EventEmitter();
    @Output() public readonly sortByKey: EventEmitter<string> = new EventEmitter();
    @Output() public readonly openContextMenu: EventEmitter<MouseEvent> = new EventEmitter();
    public orderType: typeof SortOrderType = SortOrderType;
    public limit: number = OVERLOAD_WIDTH_TABLE_HEAD_CELL;

    constructor(protected readonly filterable: FilterableService<T>) {}

    @HostListener('contextmenu', ['$event'])
    public openContextMenuHandler($event: MouseEvent): void {
        this.openContextMenu.emit($event);
    }

    public sortIfEnabled(): void {
        const key: Nullable<string> = this.columnSchema?.key;

        if (isNotNil(key)) {
            const sortIsEnabled: boolean = isTrue(this.columnSchema?.sortable);
            const sortIsActive: boolean = isNotNil(this.sortableDefinition[key]);

            if (sortIsEnabled || sortIsActive) {
                this.sortByKey.emit(key);
            }
        }
    }

    public openFilter(key: Nullable<string>, event: MouseEvent): void {
        if (isNotNil(key)) {
            this.filterable.openFilter(key, event);
        }

        /**
         * Note: need to be called so that the cell (parent element) does not catch the event and start sorting
         */
        event.stopPropagation();
        event.preventDefault();
    }
}
