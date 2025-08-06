/* eslint-disable @angular-eslint/no-input-rename */
import {NgClass, NgStyle} from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    input,
    NgZone,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {getValueByPath} from '@angular-ru/cdk/object';
import {MergeCssClassesPipe} from '@angular-ru/cdk/pipes';
import {Nullable, PlainObjectOf} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {VirtualFor} from '../../directives/virtual-for.directive';
import {
    ColumnsSchema,
    ProduceDisableFn,
    TableClickEventEmitter,
    TableEvent,
    ViewPortInfo,
    VirtualIndex,
} from '../../interfaces/table-builder.external';
import {
    RecalculatedStatus,
    TableBrowserEvent,
} from '../../interfaces/table-builder.internal';
import {DisableRowPipe} from '../../pipes/disable-row.pipe';
import {ContextMenuService} from '../../services/context-menu/context-menu.service';
import {SelectionService} from '../../services/selection/selection.service';
import {NgxContextMenu} from '../ngx-context-menu/ngx-context-menu.component';
import {TableCell} from '../table-cell/table-cell.component';

const SELECTION_DELAY = 100;

@Component({
    selector: 'table-tbody',
    imports: [
        DisableRowPipe,
        MergeCssClassesPipe,
        NgClass,
        NgStyle,
        TableCell,
        VirtualFor,
    ],
    templateUrl: './table-tbody.component.html',
    styleUrls: ['./table-tbody.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableTbody<T> {
    public cd = inject(ChangeDetectorRef);

    private readonly ngZone = inject(NgZone);
    public readonly source = input<Nullable<T[]>>(null);

    public readonly striped = input(false);

    public readonly isRendered = input(false);

    public readonly offsetTop = input<Nullable<number>>(null, {alias: 'offset-top'});

    public readonly primaryKey = input<Nullable<string>>(null, {alias: 'primary-key'});

    public readonly recalculated = input<Nullable<RecalculatedStatus>>(null);

    public readonly headLineHeight = input<Nullable<number>>(null, {
        alias: 'head-height',
    });

    public readonly viewportInfo = input<Nullable<ViewPortInfo>>(null, {
        alias: 'viewport-info',
    });

    public readonly virtualIndexes = input<VirtualIndex[]>([], {
        alias: 'virtual-indexes',
    });

    public readonly enableSelection = input(false, {alias: 'enable-selection'});

    public readonly enableFiltering = input(false, {alias: 'enable-filtering'});

    public readonly disableDeepPath = input(false, {alias: 'disable-deep-path'});

    public readonly tableViewport = input<Nullable<HTMLElement>>(null, {
        alias: 'table-viewport',
    });

    public readonly columnVirtualHeight = input<Nullable<number>>(null, {
        alias: 'column-virtual-height',
    });

    public readonly selectionEntries = input<PlainObjectOf<boolean>>(
        {},
        {alias: 'selection-entries'},
    );

    public readonly contextMenuTemplate = input<Nullable<NgxContextMenu<T>>>(null, {
        alias: 'context-menu',
    });

    public readonly produceDisableFn = input<ProduceDisableFn<T>>(null, {
        alias: 'produce-disable-fn',
    });

    public readonly clientRowHeight = input<Nullable<number>>(null, {
        alias: 'client-row-height',
    });

    public readonly rowCssClasses = input<PlainObjectOf<string[]>>(
        {},
        {alias: 'row-css-classes'},
    );

    public readonly columnSchema = input<Nullable<ColumnsSchema>>(null, {
        alias: 'column-schema',
    });

    @Output()
    public readonly changed = new EventEmitter<void>(true);

    public selection = inject(SelectionService<T>);
    public contextMenu = inject(ContextMenuService<T>);

    public get canSelectTextInTable(): boolean {
        return !this.selection.selectionStart.status;
    }

    public openContextMenu(event: MouseEvent, key: Nullable<string>, row: T): void {
        if (isNotNil(this.contextMenuTemplate())) {
            this.ngZone.run((): void => {
                const selectOnlyUnSelectedRow: boolean =
                    this.enableSelection() && !this.checkSelectedItem(row);

                if (selectOnlyUnSelectedRow) {
                    this.selection.selectRow(row, event);
                }

                this.contextMenu.openContextMenu(event, key, row);
                this.changed.emit();
            });
        }
    }

    public handleDblClick<K>(
        row: T,
        key: string,
        event: MouseEvent,
        emitter?: TableClickEventEmitter<T, K>,
    ): void {
        window.clearInterval(this.selection.selectionTaskIdle ?? 0);
        this.handleEventEmitter(row, key, event, emitter);
    }

    public handleOnClick<K>(
        row: T,
        key: string,
        event: MouseEvent,
        emitter?: TableClickEventEmitter<T, K>,
    ): void {
        this.ngZone.run((): void => {
            if (this.enableSelection()) {
                // eslint-disable-next-line no-restricted-properties
                this.selection.selectionTaskIdle = window.setTimeout((): void => {
                    this.selection.selectRow(row, event);
                    this.changed.emit();
                }, SELECTION_DELAY);
            }
        });

        this.handleEventEmitter(row, key, event, emitter);
    }

    public generateTableCellInfo<K>(
        item: T,
        key: string,
        $event: TableBrowserEvent,
    ): TableEvent<T, K> {
        return {
            row: item,
            event: $event,
            value: getValueByPath(item, key),
            preventDefault: (): void => {
                window.clearInterval(this.selection.selectionTaskIdle ?? 0);
            },
        };
    }

    private handleEventEmitter<K>(
        row: T,
        key: string,
        event: MouseEvent,
        emitter?: TableClickEventEmitter<T, K>,
    ): void {
        if (isNotNil(emitter)) {
            this.ngZone.runOutsideAngular((): void => {
                // eslint-disable-next-line no-restricted-properties
                window.setTimeout((): void => {
                    emitter.emit(this.generateTableCellInfo(row, key, event));
                });
            });
        }
    }

    private checkSelectedItem(row: T): boolean {
        return (
            this.selection.selectionModel.get((row as any)[this.primaryKey()!]) ?? false
        );
    }
}
