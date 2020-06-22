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

import {
    ColumnsSchema,
    ProduceDisableFn,
    TableClickEventEmitter,
    TableEvent,
    TableRow,
    ViewPortInfo,
    VirtualIndex
} from '../../interfaces/table-builder.external';
import { KeyMap, RecalculatedStatus, TableBrowserEvent } from '../../interfaces/table-builder.internal';
import { getDeepValue } from '../../operators/deep-value';
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
export class TableTbodyComponent {
    public selection: SelectionService;
    public contextMenu: ContextMenuService;
    @Input() public source: TableRow[] | null = null;
    @Input() public striped: boolean = false;
    @Input() public isRendered: boolean = false;
    @Input('offset-top') public offsetTop: number | null = null;
    @Input('primary-key') public primaryKey: string | null = null;
    @Input() public recalculated: RecalculatedStatus | null = null;
    @Input('head-height') public headLineHeight: number | null = null;
    @Input('viewport-info') public viewportInfo: ViewPortInfo | null = null;
    @Input('virtual-indexes') public virtualIndexes: VirtualIndex[] = [];
    @Input('enable-selection') public enableSelection: boolean = false;
    @Input('enable-filtering') public enableFiltering: boolean = false;
    @Input('table-viewport') public tableViewport: HTMLElement | null = null;
    @Input('column-virtual-height') public columnVirtualHeight: number | null = null;
    @Input('selection-entries') public selectionEntries: KeyMap<boolean> = {};
    @Input('context-menu') public contextMenuTemplate: NgxContextMenuComponent | null = null;
    @Input('produce-disable-fn') public produceDisableFn: ProduceDisableFn = null;
    @Input('client-row-height') public clientRowHeight: number | null = null;
    @Input('column-schema') public columnSchema: ColumnsSchema | null = null;
    @Output() public changed: EventEmitter<void> = new EventEmitter(true);
    private readonly ngZone: NgZone;

    constructor(public cd: ChangeDetectorRef, injector: Injector) {
        this.selection = injector.get<SelectionService>(SelectionService);
        this.contextMenu = injector.get<ContextMenuService>(ContextMenuService);
        this.ngZone = injector.get<NgZone>(NgZone);
    }

    public get canSelectTextInTable(): boolean {
        return !this.selection.selectionStart.status;
    }

    public openContextMenu(event: MouseEvent, key: string | null | undefined, row: TableRow): void {
        if (this.contextMenuTemplate) {
            this.ngZone.run((): void => {
                const selectOnlyUnSelectedRow: boolean = this.enableSelection && !this.checkSelectedItem(row);

                if (selectOnlyUnSelectedRow) {
                    this.selection.selectRow(row, event, this.source ?? []);
                }

                this.contextMenu.openContextMenu(event, key, row);
                this.changed.emit();
            });
        }
    }

    // eslint-disable-next-line max-params
    public handleDblClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        window.clearInterval(this.selection.selectionTaskIdle!);
        this.handleEventEmitter(row, key, event, emitter);
    }

    // eslint-disable-next-line max-params
    public handleOnClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        this.ngZone.run((): void => {
            if (this.enableSelection) {
                this.selection.selectionTaskIdle = window.setTimeout((): void => {
                    this.selection.selectRow(row, event, this.source ?? []);
                    this.changed.emit();
                }, SELECTION_DELAY);
            }
        });

        this.handleEventEmitter(row, key, event, emitter);
    }

    public generateTableCellInfo(item: TableRow, key: string, $event: TableBrowserEvent): TableEvent {
        return {
            row: item,
            event: $event,
            value: getDeepValue(item, key),
            preventDefault: (): void => {
                window.clearInterval(this.selection.selectionTaskIdle!);
            }
        };
    }

    // eslint-disable-next-line max-params
    private handleEventEmitter(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        if (emitter) {
            this.ngZone.runOutsideAngular((): void => {
                window.setTimeout((): void => {
                    emitter.emit(this.generateTableCellInfo(row, key, event));
                });
            });
        }
    }

    private checkSelectedItem(row: TableRow): boolean {
        return this.selection.selectionModel.get(row[this.primaryKey!]);
    }
}
