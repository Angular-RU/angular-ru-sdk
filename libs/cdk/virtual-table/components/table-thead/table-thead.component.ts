/* eslint-disable @angular-eslint/no-input-rename */
import {NgClass, NgStyle, NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    inject,
    input,
    output,
    ViewEncapsulation,
} from '@angular/core';
import {fadeInLinearAnimation} from '@angular-ru/cdk/animations';
import {IsFilledPipe} from '@angular-ru/cdk/pipes';
import {Nullable, PlainObjectOf, SortOrderType} from '@angular-ru/cdk/typings';
import {isNotNil, isTrue} from '@angular-ru/cdk/utils';

import {ColumnsSchema} from '../../interfaces/table-builder.external';
import {ResizeEvent} from '../../interfaces/table-builder.internal';
import {FilterableService} from '../../services/filterable/filterable.service';
import {OVERLOAD_WIDTH_TABLE_HEAD_CELL} from '../../table-builder.properties';

@Component({
    selector: 'table-thead',
    imports: [IsFilledPipe, NgClass, NgStyle, NgTemplateOutlet, TitleCasePipe],
    templateUrl: './table-thead.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInLinearAnimation],
})
export class TableThead<T> {
    protected readonly filterable = inject<FilterableService<T>>(FilterableService);

    public readonly columnWidth = input(0, {alias: 'column-width'});

    public readonly headHeight = input<Nullable<number | string>>(null, {
        alias: 'head-height',
    });

    public readonly sortableDefinition = input<PlainObjectOf<SortOrderType>>(
        {},
        {alias: 'sortable-definition'},
    );

    public readonly positionMap = input<PlainObjectOf<number>>(
        {},
        {alias: 'sortable-position'},
    );

    public readonly sortableCount = input(0, {alias: 'sortable-count'});

    public readonly filterableDefinition = input<
        PlainObjectOf<string> | ReadonlyMap<unknown, unknown>
    >({}, {alias: 'filterable-definition'});

    public readonly clientRowHeight = input<Nullable<number>>(null, {
        alias: 'client-row-height',
    });

    public readonly columnSchema = input<Nullable<ColumnsSchema>>(null, {
        alias: 'column-schema',
    });

    public readonly resizing = output<ResizeEvent>();
    public readonly sortByKey = output<string>();
    public readonly openContextMenu = output<MouseEvent>();

    public orderType: typeof SortOrderType = SortOrderType;
    public limit: number = OVERLOAD_WIDTH_TABLE_HEAD_CELL;

    @HostListener('contextmenu', ['$event'])
    public openContextMenuHandler($event: MouseEvent): void {
        this.openContextMenu.emit($event);
    }

    public sortIfEnabled(): void {
        const columnSchema = this.columnSchema();
        const key: Nullable<string> = columnSchema?.key;

        if (isNotNil(key)) {
            const sortIsEnabled: boolean = isTrue(columnSchema?.sortable);
            const sortIsActive: boolean = isNotNil(this.sortableDefinition()[key]);

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
