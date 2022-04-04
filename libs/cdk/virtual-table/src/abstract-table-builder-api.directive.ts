/* eslint-disable @angular-eslint/no-input-rename */
import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ApplicationRef,
    ChangeDetectorRef,
    ContentChild,
    ContentChildren,
    Directive,
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
import { coerceBoolean } from '@angular-ru/cdk/coercion';
import { pathsOfObject } from '@angular-ru/cdk/object';
import { DeepPartial, Fn, Nullable, PlainObjectOf, PrimaryKey } from '@angular-ru/cdk/typings';
import { detectChanges, isNotNil, isTrue } from '@angular-ru/cdk/utils';

import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { NgxContextMenuComponent } from './components/ngx-context-menu/ngx-context-menu.component';
import { NgxEmptyComponent } from './components/ngx-empty/ngx-empty.component';
import { NgxFilterComponent } from './components/ngx-filter/ngx-filter.component';
import { NgxFooterComponent } from './components/ngx-footer/ngx-footer.component';
import { NgxHeaderComponent } from './components/ngx-header/ngx-header.component';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { TABLE_GLOBAL_OPTIONS } from './config/table-global-options';
import {
    ColumnsSchema,
    ExcludePattern,
    GeneralTableSettings,
    OrderedField,
    ProduceDisableFn,
    TableUpdateSchema,
    ViewPortInfo
} from './interfaces/table-builder.external';
import { ResizeEvent } from './interfaces/table-builder.internal';
import { ContextMenuService } from './services/context-menu/context-menu.service';
import { DraggableService } from './services/draggable/draggable.service';
import { FilterDescriptor } from './services/filterable/filter-descriptor';
import { FilterWorkerEvent } from './services/filterable/filter-worker-event';
import { FilterableService } from './services/filterable/filterable.service';
import { ResizableService } from './services/resizer/resizable.service';
import { SelectionMap } from './services/selection/selection';
import { SelectionService } from './services/selection/selection.service';
import { SortableService } from './services/sortable/sortable.service';
import { NgxTableViewChangesService } from './services/table-view-changes/ngx-table-view-changes.service';
import { TemplateParserService } from './services/template-parser/template-parser.service';
import { SCROLLBAR_SIZE } from './table-builder.properties';
import { TableSortTypes } from './types/table-sort-types';

const { ROW_HEIGHT, FILTER_DELAY_TIME, TIME_IDLE, TIME_RELOAD }: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

@Directive()
export abstract class AbstractTableBuilderApiDirective<T>
    implements OnChanges, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy
{
    public abstract readonly templateParser: TemplateParserService<T>;
    public abstract readonly selection: SelectionService<T>;
    public abstract readonly cd: ChangeDetectorRef;
    public abstract readonly resize: ResizableService;
    public abstract readonly sortable: SortableService<T>;
    public abstract readonly contextMenu: ContextMenuService<T>;
    public abstract readonly filterable: FilterableService<T>;
    public abstract readonly ngZone: NgZone;
    protected abstract readonly app: ApplicationRef;
    protected abstract readonly viewChanges: NgxTableViewChangesService;
    protected abstract readonly draggable: DraggableService<T>;
    private filterIdTask: Nullable<number> = null;
    private idleDetectChangesId: Nullable<number> = null;
    private columnFrameId: Nullable<number> = null;
    private onChangesId: number = 0;
    private _headHeight: Nullable<number> = null;
    private _rowHeight: Nullable<number> = null;
    protected originalSource: Nullable<T[]> = null;
    protected renderedCountKeys: Nullable<number> = null;
    protected isDragMoving: boolean = false;
    @Input() public height: Nullable<string | number> = null;
    @Input() public width: Nullable<string | number> = null;
    @Input() public source: Nullable<T[]> = null;
    @Input() public keys: string[] = [];
    @Input() public striped: boolean = true;
    @Input() public name: Nullable<string> = null;
    @Input('skip-sort') public skipSort: boolean | string = false;
    @Input('sort-types') public sortTypes: TableSortTypes = null;
    @Input('filter-definition') public filterDefinition: Nullable<FilterDescriptor[]> = [];
    @Input('exclude-keys') public excludeKeys: ExcludePattern<T>[] = [];
    @Input('auto-width') public autoWidth: boolean | string = false;
    @Input('auto-height') public autoHeightDetect: boolean = true;
    @Input('native-scrollbar') public nativeScrollbar: boolean = false;
    @Input('primary-key') public primaryKey: string = PrimaryKey.ID;
    @Input('vertical-border') public verticalBorder: boolean = true;
    @Input('enable-selection') public enableSelection: boolean | string = false;
    @Input('enable-filtering') public enableFiltering: boolean | string = false;
    @Input('produce-disable-fn') public produceDisableFn: ProduceDisableFn<T> = null;
    @Input('row-css-classes') public rowCssClasses: PlainObjectOf<string[]> = {};
    @Input('schema-columns') public schemaColumns: Nullable<TableUpdateSchema> = null;
    @Input('schema-version') public schemaVersion: number = 1;
    @Output() public readonly afterRendered: EventEmitter<boolean> = new EventEmitter();
    @Output() public readonly schemaChanges: EventEmitter<TableUpdateSchema> = new EventEmitter();
    // TODO: should be rename (breaking changes)
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() public readonly onChanges: EventEmitter<Nullable<T[]>> = new EventEmitter();
    @Output() public readonly sortChanges: EventEmitter<OrderedField[]> = new EventEmitter();
    @ContentChild(NgxOptionsComponent, { static: false }) public columnOptions: Nullable<NgxOptionsComponent> = null;

    @ContentChildren(NgxColumnComponent) public columnTemplates: Nullable<QueryList<NgxColumnComponent<T>>> = null;

    @ContentChild(NgxContextMenuComponent, { static: false })
    public contextMenuTemplate: Nullable<NgxContextMenuComponent<T>> = null;

    @ContentChild(NgxEmptyComponent, { read: ElementRef }) public ngxEmptyContent: Nullable<ElementRef> = null;

    @ContentChild(NgxHeaderComponent, { static: false }) public headerTemplate: Nullable<NgxHeaderComponent> = null;

    @ContentChild(NgxFooterComponent, { static: false }) public footerTemplate: Nullable<NgxFooterComponent> = null;

    @ContentChild(NgxFilterComponent, { static: false })
    public filterTemplate: Nullable<NgxFilterComponent<T>> = null;

    @ViewChild('tableViewport', { static: true }) public scrollContainer!: ElementRef<HTMLElement>;

    @ViewChildren('column', { read: false }) public columnList!: QueryList<ElementRef<HTMLDivElement>>;

    public scrollbarWidth: number = SCROLLBAR_SIZE;
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
    public isDragging: PlainObjectOf<boolean> = {};
    public accessDragging: boolean = false;
    public filteringRun: boolean = false;

    /**
     * @description - <table-builder [keys]=[ 'id', 'value', 'id', 'position', 'value' ] />
     * returned unique displayed columns [ 'id', 'value', 'position' ]
     */
    public get displayedColumns(): string[] {
        return Object.keys(this.templateParser.compiledTemplates);
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
        return this.templateParser.schema?.columns ?? [];
    }

    /**
     * todo caretaker note
     * @deprecated - remove in v13
     * remove and replace with AbstractTableBuilderApiDirective#getSelectedItems
     * while table refactoring
     */
    public get selectedItems(): T[] {
        return this.getSelectedItems();
    }

    public get selectionModel(): SelectionMap<T> {
        return this.selection.selectionModel;
    }

    public get clientRowHeight(): number {
        return this._rowHeight ?? ROW_HEIGHT;
    }

    public get columnVirtualHeight(): number {
        return this.sourceRef.length * this.clientRowHeight;
    }

    public get columnHeight(): number {
        return this.size * this.clientRowHeight + this.headLineHeight;
    }

    public get headLineHeight(): number {
        return isNotNil(this._headHeight) ? this._headHeight : this.clientRowHeight;
    }

    public get size(): number {
        return this.sourceRef.length;
    }

    /**
     * @description Returns a list of displayed table entries, including filters and sorting.
     */
    public get sourceRef(): T[] {
        return this.source ?? [];
    }

    public get firstItem(): T {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return this.sourceRef[0] || ({} as T);
    }

    public get lastItem(): T {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return this.sourceRef[this.sourceRef.length - 1] || ({} as T);
    }

    /**
     * @description Returns the entire list of table entries, excluding filters and sorting.
     */
    public get originalSourceRef(): T[] {
        return this.originalSource ?? this.source ?? [];
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

    @Input('head-height')
    public set headHeight(value: string | number) {
        this._headHeight = parseInt(value as string);
    }

    @Input('row-height')
    public set rowHeight(value: Nullable<string | number>) {
        this._rowHeight = parseInt((value ?? ROW_HEIGHT) as string);
    }

    private get shouldBeFiltered(): boolean {
        return this.filterable.filterValueExist && this.isEnableFiltering;
    }

    private get shouldBeSorted(): boolean {
        return this.sortable.notEmpty;
    }

    private get expanded(): Nullable<boolean> {
        return coerceBoolean(this.headerTemplate?.expandablePanel) && isNotNil(this.headerTemplate?.expanded)
            ? coerceBoolean(this.headerTemplate?.expanded)
            : null;
    }

    public abstract setSource(source: Nullable<T[]>): void;
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
    protected abstract updateViewportInfo(start: number, end: number): void;

    public recheckViewportChecked(): void {
        this.tableViewportChecked = !this.tableViewportChecked;
        this.idleDetectChanges();
    }

    public enableDragging(key: Nullable<string>): void {
        if (isNotNil(key) && isTrue(this.templateParser.compiledTemplates[key]?.draggable)) {
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
            window.clearInterval(this.filterIdTask ?? 0);
            this.filteringRun = true;
            detectChanges(this.cd);
            // eslint-disable-next-line no-restricted-properties
            this.filterIdTask = window.setTimeout((): void => {
                this.sortAndFilter().then((): void => {
                    this.reCheckDefinitions();
                    after?.();

                    this.filteringRun = false;
                    detectChanges(this.cd);
                });
            }, FILTER_DELAY_TIME);
        });
    }

    public async sortAndFilter(): Promise<void> {
        await this.sortAndFilterOriginalSource();
        this.selection.rows = this.source;

        // TODO: need research this code, because we have problem with recursive update,
        //  when page have more than one tables
        this.ngZone.runOutsideAngular((): void => {
            window.clearTimeout(this.onChangesId);
            // eslint-disable-next-line no-restricted-properties
            this.onChangesId = window.setTimeout((): void => {
                this.onChanges.emit(this.sourceRef);
            });
        });
    }

    public sortByKey(key: string): void {
        this.sortable.updateSortKey(key);
        this.sortAndFilter().then((): void => this.reCheckDefinitions());
    }

    public drop({ previousIndex, currentIndex }: CdkDragSortEvent): void {
        const previousKey: Nullable<string> = this.visibleColumns[previousIndex];
        const currentKey: Nullable<string> = this.visibleColumns[currentIndex];

        this.isDragMoving = false;
        this.draggable.drop(previousKey, currentKey);
        this.changeSchema();
    }

    public changeSchema(defaultColumns: Nullable<DeepPartial<ColumnsSchema>[]> = null): void {
        const renderedColumns: Nullable<DeepPartial<ColumnsSchema>[]> = this.templateParser.schema?.exportColumns();
        const columns: Nullable<DeepPartial<ColumnsSchema>[]> = defaultColumns ?? renderedColumns;
        const generalTableSettings: GeneralTableSettings = {
            expanded: this.expanded
        };

        if (isNotNil(columns)) {
            const updateSchema: TableUpdateSchema = {
                columns,
                generalTableSettings,
                name: this.name,
                version: this.schemaVersion
            };

            this.viewChanges.update(updateSchema);
            this.schemaChanges.emit(updateSchema);
            this.idleDetectChanges();
        }
    }

    public idleDetectChanges(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.cancelAnimationFrame(this.idleDetectChangesId ?? 0);
            this.idleDetectChangesId = window.requestAnimationFrame((): void => detectChanges(this.cd));
        });
    }

    public getSelectedItems(): T[] {
        return this.sourceRef.filter((item: T): boolean =>
            isNotNil(this.selectionModel.entries[(item as any)[this.primaryKey]])
        );
    }

    protected reCheckDefinitions(): void {
        this.filterable.definition = { ...this.filterable.definition };
        this.filterable.changeFilteringStatus();
        this.calculateViewport(true);
        // eslint-disable-next-line no-restricted-properties
        window.setTimeout((): void => this.app.tick(), TIME_RELOAD);
    }

    protected forceCalculateViewport(): void {
        this.updateViewportInfo(this.viewPortInfo.startIndex ?? 0, this.viewPortInfo.endIndex ?? 0);
    }

    /**
     * @description: returns the number of keys in the model
     * @example: <table-builder [source]=[{ id: 1, name: 'hello' }, ...] /> a value of 2 will be returned
     */
    protected getCountKeys(): number {
        return Object.keys(this.firstItem).length;
    }

    /**
     * @see AbstractTableBuilderApiDirective#customModelColumnsKeys for further information
     */
    protected generateCustomModelColumnsKeys(): string[] {
        return this.excluding(this.keys);
    }

    /**
     * @see AbstractTableBuilderApiDirective#modelColumnKeys for further information
     */
    protected generateModelColumnKeys(): string[] {
        return this.excluding(this.getModelKeys());
    }

    protected getModelKeys(): string[] {
        return pathsOfObject(this.firstItem);
    }

    protected calculateColumnWidthSummary(): void {
        if (this.isDragMoving) {
            return;
        }

        this.ngZone.runOutsideAngular((): void => {
            clearInterval(this.columnFrameId ?? 0);
            // eslint-disable-next-line no-restricted-properties
            this.columnFrameId = window.setTimeout((): void => {
                let width: number = 0;

                for (const element of this.columnList) {
                    width += element.nativeElement.offsetWidth;
                }

                this.columnListWidth = width;
                this.idleDetectChanges();
            }, TIME_IDLE);
        });
    }

    private async sortAndFilterOriginalSource(): Promise<void> {
        this.source = this.originalSource ?? [];

        if (this.shouldBeFiltered) {
            const filter: FilterWorkerEvent<T> = await this.filterable.filter(this.source);

            this.source = filter.source;
            filter.fireSelection();
        }

        if (this.shouldBeSorted) {
            this.source = await this.sortable.sort(this.source);
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
        return this.excludeKeys.length > 0
            ? keys.filter(
                  (key: string): boolean =>
                      !this.excludeKeys.some((excludeKey: ExcludePattern<T>): boolean =>
                          excludeKey instanceof RegExp ? Boolean(key.match(excludeKey)) : key === excludeKey
                      )
              )
            : keys;
    }
}
