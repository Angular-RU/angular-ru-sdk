import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ApplicationRef,
    ChangeDetectorRef,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren
} from '@angular/core';

import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { NgxContextMenuComponent } from './components/ngx-context-menu/ngx-context-menu.component';
import { NgxFilterComponent } from './components/ngx-filter/ngx-filter.component';
import { NgxFooterComponent } from './components/ngx-footer/ngx-footer.component';
import { NgxHeaderComponent } from './components/ngx-header/ngx-header.component';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { TABLE_GLOBAL_OPTIONS } from './config/table-global-options';
import {
    ColumnsSchema,
    OrderedField,
    ProduceDisableFn,
    SimpleSchemaColumns,
    TableRow,
    ViewPortInfo
} from './interfaces/table-builder.external';
import { Any, Fn, KeyMap, PrimaryKey, QueryListRef, ResizeEvent } from './interfaces/table-builder.internal';
import { detectChanges } from './operators/detect-changes';
import { ContextMenuService } from './services/context-menu/context-menu.service';
import { DraggableService } from './services/draggable/draggable.service';
import { FilterWorkerEvent } from './services/filterable/filterable.interface';
import { FilterableService } from './services/filterable/filterable.service';
import { ResizableService } from './services/resizer/resizable.service';
import { SelectionMap } from './services/selection/selection';
import { SelectionService } from './services/selection/selection.service';
import { SortableService } from './services/sortable/sortable.service';
import { NgxTableViewChangesService } from './services/table-view-changes/ngx-table-view-changes.service';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { UtilsService } from './services/utils/utils.service';
import { SCROLLBAR_WIDTH } from './symbols';

const { ROW_HEIGHT, MACRO_TIME, TIME_IDLE }: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

// eslint-disable-next-line
export abstract class TableBuilderApiImpl
    implements OnChanges, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy {
    @Input() public height: number | null = null;
    @Input() public width: string | null = null;
    @Input() public source: TableRow[] | null = null;
    @Input() public keys: string[] = [];
    @Input() public striped: boolean = true;
    @Input() public name: string | null = null;
    @Input('skip-sort') public skipSort: boolean | string = false;
    @Input('sort-types') public sortTypes: KeyMap | null = null;
    @Input('exclude-keys') public excludeKeys: (string | RegExp)[] = [];
    @Input('auto-width') public autoWidth: boolean | string = false;
    @Input('auto-height') public autoHeightDetect: boolean = true;
    @Input('native-scrollbar') public nativeScrollbar: boolean = false;
    @Input('primary-key') public primaryKey: string = PrimaryKey.ID;
    @Input('vertical-border') public verticalBorder: boolean = true;
    @Input('enable-selection') public enableSelection: boolean | string = false;
    @Input('enable-filtering') public enableFiltering: boolean | string = false;
    @Input('produce-disable-fn') public produceDisableFn: ProduceDisableFn = null;
    @Input('schema-columns') public schemaColumns: SimpleSchemaColumns = [];
    @Output() public afterRendered: EventEmitter<boolean> = new EventEmitter();
    @Output() public schemaChanges: EventEmitter<SimpleSchemaColumns> = new EventEmitter();
    @Output() public onChanges: EventEmitter<TableRow[] | null> = new EventEmitter();
    @Output() public sortChanges: EventEmitter<OrderedField[]> = new EventEmitter();
    @ContentChild(NgxOptionsComponent, { static: false })
    public columnOptions: NgxOptionsComponent | null = null;
    @ContentChildren(NgxColumnComponent)
    public columnTemplates: QueryListRef<NgxColumnComponent> | null = null;
    @ContentChild(NgxContextMenuComponent, { static: false })
    public contextMenuTemplate: NgxContextMenuComponent | null = null;
    @ContentChild(NgxHeaderComponent, { static: false })
    public headerTemplate: NgxHeaderComponent | null = null;
    @ContentChild(NgxFooterComponent, { static: false })
    public footerTemplate: NgxFooterComponent | null = null;
    @ContentChild(NgxFilterComponent, { static: false })
    public filterTemplate: NgxFilterComponent | null = null;
    @ViewChild('tableViewport', { static: true })
    public scrollContainer!: ElementRef<HTMLElement>;
    @ViewChildren('column', { read: false })
    public columnList!: QueryList<ElementRef<HTMLDivElement>>;
    public scrollbarWidth: number = SCROLLBAR_WIDTH;
    public columnListWidth: number = 0;
    public viewPortInfo: ViewPortInfo = {};
    public tableViewportChecked: boolean = true;
    /**
     * @description: the custom names of the column list to be displayed in the view.
     * @example:
     *    <table-builder #table
     *        [source]="[{ id: 1, name: 'hello', value: 'world', description: 'text' }, ...]"
     *        [exclude]="[ 'description' ]">
     *      <ngx-column *ngFor="let key of table.modelColumnKeys"></ngx-column>
     *    </table-builder>
     *    ------------------------
     *    modelColumnKeys === [ 'id', 'hello', 'value' ]
     */
    public modelColumnKeys: string[] = [];
    /**
     * @description: the custom names of the column list to be displayed in the view.
     * @example:
     *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] />
     *    customModelColumnsKeys === [ 'id', 'description', 'name', 'description' ]
     *    ------------------------
     *    <table-builder [keys]=[ 'id', 'description', 'name', 'description' ] [exclude]=[ 'id', 'description' ] />
     *    customModelColumnsKeys === [ 'name' ]
     */
    public customModelColumnsKeys: string[] = [];
    public isDragging: KeyMap<boolean> = {};
    public accessDragging: boolean = false;
    public abstract readonly templateParser: TemplateParserService;
    public abstract readonly selection: SelectionService;
    public abstract readonly utils: UtilsService;
    public abstract readonly cd: ChangeDetectorRef;
    public abstract readonly resize: ResizableService;
    public abstract readonly sortable: SortableService;
    public abstract readonly contextMenu: ContextMenuService;
    public abstract readonly filterable: FilterableService;
    public abstract readonly ngZone: NgZone;
    protected originalSource: TableRow[] | null = null;
    protected renderedCountKeys: number | null = null;
    protected isDragMoving: boolean = false;
    protected abstract readonly app: ApplicationRef;
    protected abstract readonly viewChanges: NgxTableViewChangesService;
    protected abstract readonly draggable: DraggableService;
    private filterIdTask: number | null = null;
    private idleDetectChangesId: number | null = null;
    private columnFrameId: number | null = null;
    private _headHeight: number | null = null;
    private _rowHeight: number | null = null;

    @Input('head-height')
    public set headHeight(val: string | number) {
        this._headHeight = parseInt(val as string);
    }

    @Input('row-height')
    public set rowHeight(val: string | number) {
        this._rowHeight = parseInt(val as string);
    }

    /**
     * @description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
     * returned unique displayed columns [ 'id', 'value', 'position' ]
     */
    public get displayedColumns(): string[] {
        return Object.keys(this.templateParser.compiledTemplates) || [];
    }

    public get visibleColumns(): string[] {
        return this.columnSchema
            .filter((column: ColumnsSchema): boolean => column.isVisible)
            .map((column: ColumnsSchema): string => column.key!);
    }

    /**
     * @description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
     * returned ordered displayed columns [ 'id', 'value', 'id', 'position', 'value' ]
     */
    public get positionColumns(): string[] {
        return this.columnSchema.map((column: ColumnsSchema): string => column.key!);
    }

    public get columnSchema(): ColumnsSchema[] {
        return (this.templateParser.schema && this.templateParser.schema.columns) || [];
    }

    /**
     * @description - return selected item by selection map
     * Don't use in angular templates, because function not pure
     * avoid: {{ table.selectedItems.length  }}
     * recommendation: {{ table.selectionModel.size  }}
     */
    public get selectedItems(): TableRow[] {
        return this.sourceRef.filter(
            (item: TableRow[]): TableRow => this.selectionModel.entries[(item as Any)[this.primaryKey]]
        );
    }

    public get firstItem(): TableRow {
        return this.sourceRef[0] || {};
    }

    public get lastItem(): TableRow {
        return this.sourceRef[this.sourceRef.length - 1] || {};
    }

    public get selectionModel(): SelectionMap {
        return this.selection.selectionModel;
    }

    public get clientRowHeight(): number {
        return this._rowHeight || ROW_HEIGHT;
    }

    public get columnVirtualHeight(): number {
        return this.sourceRef.length * this.clientRowHeight;
    }

    public get columnHeight(): number {
        return this.size * this.clientRowHeight + this.headLineHeight;
    }

    public get headLineHeight(): number {
        return this._headHeight ? this._headHeight : this.clientRowHeight;
    }

    public get size(): number {
        return this.sourceRef.length;
    }

    public get sourceRef(): TableRow[] {
        return this.source && this.source.length ? this.source : [];
    }

    public get isEnableFiltering(): boolean {
        return this.enableFiltering !== false;
    }

    public get isSkippedInternalSort(): boolean {
        return this.skipSort !== false;
    }

    public get isEnableAutoWidthColumn(): boolean {
        return this.autoWidth !== false;
    }

    public get isEnableSelection(): boolean {
        return this.enableSelection !== false;
    }

    private get filterValueExist(): boolean {
        return this.filterable.filterValueExist && this.isEnableFiltering;
    }

    private get notEmpty(): boolean {
        return !this.sortable.empty && !!this.source;
    }

    private get notChanges(): boolean {
        return this.sortable.empty && !this.filterable.filterValueExist;
    }

    public recheckViewportChecked(): void {
        this.tableViewportChecked = !this.tableViewportChecked;
        this.idleDetectChanges();
    }

    public enableDragging(key: string): void {
        if (this.templateParser.compiledTemplates[key].draggable) {
            this.accessDragging = true;
            detectChanges(this.cd);
        }
    }

    public disableDragging(): void {
        if (this.accessDragging) {
            this.accessDragging = false;
            detectChanges(this.cd);
        }
    }

    public resizeColumn({ event, key }: ResizeEvent, column: HTMLDivElement): void {
        this.recheckViewportChecked();
        this.disableDragging();

        this.resize.resize(
            event as MouseEvent,
            column,
            (width: number): void => this.calculateWidth(key, width),
            (): void => this.afterCalculateWidth()
        );

        event.preventDefault();
    }

    public filter(after?: Fn): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearInterval(this.filterIdTask!);
            this.filterIdTask = window.setTimeout((): void => {
                if (!this.isEnableFiltering) {
                    throw new Error('You forgot to enable filtering: \n <ngx-table-builder enable-filtering />');
                }

                this.sortAndFilter().then((): void => {
                    this.reCheckDefinitions();
                    if (after) {
                        after();
                    }
                });
            }, MACRO_TIME);
        });
    }

    public async sortAndFilter(): Promise<void> {
        await this.recalculationSource();
        this.onChanges.emit(this.sourceRef);
    }

    public sortByKey(key: string): void {
        this.sortable.updateSortKey(key);
        this.sortAndFilter().then((): void => this.reCheckDefinitions());
    }

    public drop({ previousIndex, currentIndex }: CdkDragSortEvent): void {
        const previousKey: string = this.visibleColumns[previousIndex];
        const currentKey: string = this.visibleColumns[currentIndex];
        this.isDragMoving = false;
        this.draggable.drop(previousKey, currentKey);
        this.changeSchema();
    }

    public changeSchema(defaultColumns: SimpleSchemaColumns | null = null): void {
        const renderedColumns: SimpleSchemaColumns | undefined = this.templateParser.schema?.exportColumns();
        const columns: SimpleSchemaColumns | undefined = defaultColumns || renderedColumns;

        if (columns) {
            this.viewChanges.update({ name: this.name, columns });
            this.schemaChanges.emit(columns);
            this.idleDetectChanges();
        }
    }

    public idleDetectChanges(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.cancelAnimationFrame(this.idleDetectChangesId!);
            this.idleDetectChangesId = window.requestAnimationFrame((): void => detectChanges(this.cd));
        });
    }

    public abstract setSource(source: TableRow[]): void;

    public abstract markDirtyCheck(): void;

    public abstract markForCheck(): void;

    public abstract markTemplateContentCheck(): void;

    public abstract ngOnChanges(changes: SimpleChanges): void;

    public abstract ngOnInit(): void;

    public abstract ngAfterContentInit(): void;

    public abstract ngAfterViewInit(): void;

    public abstract ngAfterViewChecked(): void;

    public abstract ngOnDestroy(): void;

    public abstract calculateViewport(force: boolean): void;

    protected reCheckDefinitions(): void {
        this.filterable.definition = { ...this.filterable.definition };
        this.filterable.changeFilteringStatus();
        this.calculateViewport(true);
    }

    protected forceCalculateViewport(): void {
        this.updateViewportInfo(this.viewPortInfo.startIndex!, this.viewPortInfo.endIndex!);
    }

    /**
     * @description: returns the number of keys in the model
     * @example: <table-builder [source]=[{ id: 1, name: 'hello' }, ...] /> a value of 2 will be returned
     */
    protected getCountKeys(): number {
        return Object.keys(this.firstItem).length;
    }

    /**
     * @see TableBuilderApiImpl#customModelColumnsKeys for further information
     */
    protected generateCustomModelColumnsKeys(): string[] {
        return this.excluding(this.keys);
    }

    /**
     * @see TableBuilderApiImpl#modelColumnKeys for further information
     */
    protected generateModelColumnKeys(): string[] {
        return this.excluding(this.getModelKeys());
    }

    protected getModelKeys(): string[] {
        return this.utils.flattenKeysByRow(this.firstItem);
    }

    protected calculateColumnWidthSummary(): void {
        if (this.isDragMoving) {
            return;
        }

        this.ngZone.runOutsideAngular((): void => {
            clearInterval(this.columnFrameId!);
            this.columnFrameId = window.setTimeout((): void => {
                let width: number = 0;
                this.columnList.forEach((element: ElementRef<HTMLDivElement>): void => {
                    width += element.nativeElement.offsetWidth;
                });
                this.columnListWidth = width;
                this.idleDetectChanges();
            }, TIME_IDLE);
        });
    }

    protected abstract updateViewportInfo(start: number, end: number): void;

    private async recalculationSource(): Promise<void> {
        if (this.filterValueExist) {
            const filter: FilterWorkerEvent = await this.filterable.filter(this.originalSource ?? []);
            this.source = await this.sortable.sort(filter.source);
            filter.fireSelection();
        } else if (this.notEmpty) {
            this.source = await this.sortable.sort(this.originalSource ?? []);
        }

        if (this.notChanges) {
            this.source = this.originalSource;
        }
    }

    private calculateWidth(key: string, width: number): void {
        this.isDragging[key] = true;
        this.calculateColumnWidthSummary();
        this.onMouseResizeColumn(key, width);
    }

    private afterCalculateWidth(): void {
        this.isDragging = {};
        this.recheckViewportChecked();
        this.changeSchema();
    }

    private onMouseResizeColumn(key: string, width: number): void {
        this.templateParser.mutateColumnSchema(key, { width });
        this.idleDetectChanges();
    }

    private excluding(keys: string[]): string[] {
        return this.excludeKeys.length
            ? keys.filter(
                  (key: string): boolean =>
                      !this.excludeKeys.some((excludeKey: string | RegExp): boolean =>
                          excludeKey instanceof RegExp ? !!key.match(excludeKey) : key === excludeKey
                      )
              )
            : keys;
    }
}
