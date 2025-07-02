/* eslint-disable @angular-eslint/no-input-rename */
import {ChangeDetectorRef, Injector} from '@angular/core';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    NgZone,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {getValueByPath} from '@angular-ru/cdk/object';
import {Nullable, PlainObjectOf} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

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
import {ContextMenuService} from '../../services/context-menu/context-menu.service';
import {SelectionService} from '../../services/selection/selection.service';
import {NgxContextMenuComponent} from '../ngx-context-menu/ngx-context-menu.component';

const SELECTION_DELAY = 100;

@Component({
    standalone: false,
    selector: 'table-tbody',
    templateUrl: './table-tbody.component.html',
    styleUrls: ['./table-tbody.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableTbodyComponent<T> {
    private readonly ngZone: NgZone;
    @Input()
    public source: Nullable<T[]> = null;

    @Input()
    public striped = false;

    @Input()
    public isRendered = false;

    @Input('offset-top')
    public offsetTop?: Nullable<number> = null;

    @Input('primary-key')
    public primaryKey?: Nullable<string> = null;

    @Input()
    public recalculated: Nullable<RecalculatedStatus> = null;

    @Input('head-height')
    public headLineHeight: Nullable<number> = null;

    @Input('viewport-info')
    public viewportInfo: Nullable<ViewPortInfo> = null;

    @Input('virtual-indexes')
    public virtualIndexes: VirtualIndex[] = [];

    @Input('enable-selection')
    public enableSelection = false;

    @Input('enable-filtering')
    public enableFiltering = false;

    @Input('disable-deep-path')
    public disableDeepPath = false;

    @Input('table-viewport')
    public tableViewport: Nullable<HTMLElement> = null;

    @Input('column-virtual-height')
    public columnVirtualHeight: Nullable<number> = null;

    @Input('selection-entries')
    public selectionEntries: PlainObjectOf<boolean> = {};

    @Input('context-menu')
    public contextMenuTemplate: Nullable<NgxContextMenuComponent<T>> = null;

    @Input('produce-disable-fn')
    public produceDisableFn: ProduceDisableFn<T> = null;

    @Input('client-row-height')
    public clientRowHeight: Nullable<number> = null;

    @Input('row-css-classes')
    public rowCssClasses: PlainObjectOf<string[]> = {};

    @Input('column-schema')
    public columnSchema: Nullable<ColumnsSchema> = null;

    @Output()
    public readonly changed = new EventEmitter<void>(true);

    public selection: SelectionService<T>;
    public contextMenu: ContextMenuService<T>;

    constructor(
        public cd: ChangeDetectorRef,
        injector: Injector,
    ) {
        this.selection = injector.get<SelectionService<T>>(SelectionService);
        this.contextMenu = injector.get<ContextMenuService<T>>(ContextMenuService);
        this.ngZone = injector.get<NgZone>(NgZone);
    }

    public get canSelectTextInTable(): boolean {
        return !this.selection.selectionStart.status;
    }

    public openContextMenu(event: MouseEvent, key: Nullable<string>, row: T): void {
        if (isNotNil(this.contextMenuTemplate)) {
            this.ngZone.run((): void => {
                const selectOnlyUnSelectedRow: boolean =
                    this.enableSelection && !this.checkSelectedItem(row);

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
            if (this.enableSelection) {
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
        return this.selection.selectionModel.get((row as any)[this.primaryKey!]) ?? false;
    }
}
