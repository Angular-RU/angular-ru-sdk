import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Injector,
    Input,
    NgZone,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { getValueByPath } from '@angular-ru/common/object';
import { Any, PlainObjectOf } from '@angular-ru/common/typings';

import {
    ColumnsSchema,
    ProduceDisableFn,
    TableClickEventEmitter,
    TableEvent,
    ViewPortInfo,
    VirtualIndex
} from '../../interfaces/table-builder.external';
import { RecalculatedStatus, TableBrowserEvent } from '../../interfaces/table-builder.internal';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { SelectionService } from '../../services/selection/selection.service';
import { NgxContextMenuComponent } from '../ngx-context-menu/ngx-context-menu.component';

const SELECTION_DELAY: number = 100;

@Component({
    selector: 'table-tbody',
    templateUrl: './table-tbody.component.html',
    styleUrls: ['./table-tbody.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableTbodyComponent<T> {
    @Input() public source: T[] | null = null;
    @Input() public striped: boolean = false;
    @Input() public isRendered: boolean = false;
    @Input('offset-top') public offsetTop?: number | null = null;
    @Input('primary-key') public primaryKey?: string | null = null;
    @Input() public recalculated: RecalculatedStatus | null = null;
    @Input('head-height') public headLineHeight: number | null = null;
    @Input('viewport-info') public viewportInfo: ViewPortInfo | null = null;
    @Input('virtual-indexes') public virtualIndexes: VirtualIndex[] = [];
    @Input('enable-selection') public enableSelection: boolean = false;
    @Input('enable-filtering') public enableFiltering: boolean = false;
    @Input('table-viewport') public tableViewport: HTMLElement | null = null;
    @Input('column-virtual-height') public columnVirtualHeight: number | null = null;
    @Input('selection-entries') public selectionEntries: PlainObjectOf<boolean> = {};
    @Input('context-menu') public contextMenuTemplate: NgxContextMenuComponent<T> | null = null;
    @Input('produce-disable-fn') public produceDisableFn: ProduceDisableFn<T> = null;
    @Input('client-row-height') public clientRowHeight: number | null = null;
    @Input('row-css-classes') public rowCssClasses: PlainObjectOf<string[]> = {};
    @Input('column-schema') public columnSchema: ColumnsSchema | null = null;
    @Output() public readonly changed: EventEmitter<void> = new EventEmitter(true);
    public selection: SelectionService<T>;
    public contextMenu: ContextMenuService<T>;
    private readonly ngZone: NgZone;

    constructor(public cd: ChangeDetectorRef, injector: Injector) {
        this.selection = injector.get<SelectionService<T>>(SelectionService);
        this.contextMenu = injector.get<ContextMenuService<T>>(ContextMenuService);
        this.ngZone = injector.get<NgZone>(NgZone);
    }

    public get canSelectTextInTable(): boolean {
        return !this.selection.selectionStart.status;
    }

    public openContextMenu(event: MouseEvent, key: string | null | undefined, row: T): void {
        if (this.contextMenuTemplate) {
            this.ngZone.run((): void => {
                const selectOnlyUnSelectedRow: boolean = this.enableSelection && !this.checkSelectedItem(row);

                if (selectOnlyUnSelectedRow) {
                    this.selection.selectRow(row, event);
                }

                this.contextMenu.openContextMenu(event, key, row);
                this.changed.emit();
            });
        }
    }

    // eslint-disable-next-line max-params,max-params-no-constructor/max-params-no-constructor
    public handleDblClick<K>(row: T, key: string, event: MouseEvent, emitter?: TableClickEventEmitter<T, K>): void {
        window.clearInterval(this.selection.selectionTaskIdle!);
        this.handleEventEmitter(row, key, event, emitter);
    }

    // eslint-disable-next-line max-params-no-constructor/max-params-no-constructor
    public handleOnClick<K>(row: T, key: string, event: MouseEvent, emitter?: TableClickEventEmitter<T, K>): void {
        this.ngZone.run((): void => {
            if (this.enableSelection) {
                this.selection.selectionTaskIdle = window.setTimeout((): void => {
                    this.selection.selectRow(row, event);
                    this.changed.emit();
                }, SELECTION_DELAY);
            }
        });

        this.handleEventEmitter(row, key, event, emitter);
    }

    public generateTableCellInfo<K>(item: T, key: string, $event: TableBrowserEvent): TableEvent<T, K> {
        return {
            row: item,
            event: $event,
            value: getValueByPath(item, key),
            preventDefault: (): void => {
                window.clearInterval(this.selection.selectionTaskIdle!);
            }
        };
    }

    // eslint-disable-next-line max-params-no-constructor/max-params-no-constructor
    private handleEventEmitter<K>(
        row: T,
        key: string,
        event: MouseEvent,
        emitter?: TableClickEventEmitter<T, K>
    ): void {
        if (emitter) {
            this.ngZone.runOutsideAngular((): void => {
                window.setTimeout((): void => {
                    emitter.emit(this.generateTableCellInfo(row, key, event));
                });
            });
        }
    }

    private checkSelectedItem(row: T): boolean {
        return this.selection.selectionModel.get((row as Any)[this.primaryKey!]);
    }
}
