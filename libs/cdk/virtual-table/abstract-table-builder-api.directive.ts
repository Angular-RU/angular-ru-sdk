/* eslint-disable @angular-eslint/no-input-rename */
import {CdkDragSortEvent} from '@angular/cdk/drag-drop';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ApplicationRef,
    ChangeDetectorRef,
    contentChild,
    contentChildren,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    output,
    SimpleChanges,
    viewChild,
    viewChildren,
} from '@angular/core';
import {SIGNAL} from '@angular/core/primitives/signals';
import {coerceBoolean} from '@angular-ru/cdk/coercion';
import {pathsOfObject} from '@angular-ru/cdk/object';
import {
    DeepPartial,
    Fn,
    Nullable,
    PlainObject,
    PlainObjectOf,
    PrimaryKey,
} from '@angular-ru/cdk/typings';
import {detectChanges, isNotNil, isTrue} from '@angular-ru/cdk/utils';

import {NgxColumn} from './components/ngx-column/ngx-column.component';
import {NgxContextMenu} from './components/ngx-context-menu/ngx-context-menu.component';
import {NgxEmpty} from './components/ngx-empty/ngx-empty.component';
import {NgxFilter} from './components/ngx-filter/ngx-filter.component';
import {NgxFooter} from './components/ngx-footer/ngx-footer.component';
import {NgxHeader} from './components/ngx-header/ngx-header.component';
import {NgxOptions} from './components/ngx-options/ngx-options.component';
import {TABLE_GLOBAL_OPTIONS} from './config/table-global-options';
import {
    ColumnsSchema,
    ExcludePattern,
    GeneralTableSettings,
    OrderedField,
    ProduceDisableFn,
    TableUpdateSchema,
    ViewPortInfo,
} from './interfaces/table-builder.external';
import {ResizeEvent} from './interfaces/table-builder.internal';
import {ContextMenuService} from './services/context-menu/context-menu.service';
import {DraggableService} from './services/draggable/draggable.service';
import {FilterDescriptor} from './services/filterable/filter-descriptor';
import {FilterWorkerEvent} from './services/filterable/filter-worker-event';
import {FilterableService} from './services/filterable/filterable.service';
import {ResizableService} from './services/resizer/resizable.service';
import {SelectionMap} from './services/selection/selection';
import {SelectionService} from './services/selection/selection.service';
import {SortableService} from './services/sortable/sortable.service';
import {NgxTableViewChangesService} from './services/table-view-changes/ngx-table-view-changes.service';
import {TemplateParserService} from './services/template-parser/template-parser.service';
import {SCROLLBAR_SIZE} from './table-builder.properties';
import {TableSortTypes} from './types/table-sort-types';

const {
    ROW_HEIGHT,
    FILTER_DELAY_TIME,
    TIME_IDLE,
    TIME_RELOAD,
}: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

@Directive()
export abstract class AbstractTableBuilderApi<T>
    implements
        OnChanges,
        OnInit,
        AfterViewInit,
        AfterContentInit,
        AfterViewChecked,
        OnDestroy
{
    public templateParser = inject(TemplateParserService<T>);
    public selection = inject(SelectionService<T>);
    public cd = inject(ChangeDetectorRef);
    public readonly resize = inject(ResizableService);
    public readonly sortable = inject(SortableService<T>);
    public readonly contextMenu = inject(ContextMenuService<T>);
    public readonly filterable = inject(FilterableService<T>);
    public readonly ngZone = inject(NgZone);
    protected readonly app = inject(ApplicationRef);
    protected readonly viewChanges = inject(NgxTableViewChangesService);
    protected readonly draggable = inject(DraggableService<T>);
    private filterIdTask: Nullable<number> = null;
    private idleDetectChangesId: Nullable<number> = null;
    private columnFrameId: Nullable<number> = null;
    private onChangesId = 0;
    private _headHeight: Nullable<number> = null;
    private _rowHeight: Nullable<number> = null;
    protected originalSource: Nullable<T[]> = null;
    protected renderedKeys: string[] = [];
    protected isDragMoving = false;
    public readonly height = input<Nullable<number | string>>(null);

    public readonly width = input<Nullable<number | string>>(null);

    public readonly source = input<Nullable<T[]>>(null);

    public readonly keys = input<string[]>([]);

    public readonly striped = input(true);

    public readonly name = input<Nullable<string>>(null);

    public readonly skipSort = input<boolean | string>(false, {alias: 'skip-sort'});

    public readonly sortTypes = input<TableSortTypes>(null, {alias: 'sort-types'});

    public readonly filterDefinition = input<Nullable<FilterDescriptor[]>>([], {
        alias: 'filter-definition',
    });

    public readonly excludeKeys = input<Array<ExcludePattern<T>>>([], {
        alias: 'exclude-keys',
    });

    public readonly autoWidth = input<boolean | string>(false, {alias: 'auto-width'});

    public readonly autoHeightDetect = input(true, {alias: 'auto-height'});

    public readonly nativeScrollbar = input(false, {alias: 'native-scrollbar'});

    public readonly primaryKey = input<string>(PrimaryKey.ID, {alias: 'primary-key'});

    public readonly verticalBorder = input(true, {alias: 'vertical-border'});

    public readonly enableSelection = input<boolean | string>(false, {
        alias: 'enable-selection',
    });

    public readonly enableFiltering = input<boolean | string>(false, {
        alias: 'enable-filtering',
    });

    public readonly disableDeepPath = input(false, {alias: 'disable-deep-path'});

    public readonly produceDisableFn = input<ProduceDisableFn<T>>(null, {
        alias: 'produce-disable-fn',
    });

    public readonly rowCssClasses = input<PlainObjectOf<string[]>>(
        {},
        {alias: 'row-css-classes'},
    );

    public readonly schemaColumns = input<Nullable<TableUpdateSchema>>(null, {
        alias: 'schema-columns',
    });

    public readonly schemaVersion = input(1, {alias: 'schema-version'});

    public readonly isVirtualTable = input(true, {alias: 'is-virtual-table'});

    public readonly afterRendered = output<boolean>();
    public readonly schemaChanges = output<TableUpdateSchema>();

    // TODO: should be rename (breaking changes)
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    public readonly onChanges = output<Nullable<T[]>>();
    public readonly sortChanges = output<OrderedField[]>();

    public readonly columnOptions = contentChild(NgxOptions);

    public readonly columnTemplates = contentChildren<NgxColumn<T>>(NgxColumn);

    public readonly contextMenuTemplate = contentChild(NgxContextMenu);

    public readonly ngxEmptyContent = contentChild(NgxEmpty, {read: ElementRef});

    public readonly headerTemplate = contentChild(NgxHeader);

    public readonly footerTemplate = contentChild(NgxFooter);

    public readonly filterTemplate = contentChild(NgxFilter);

    public readonly scrollContainer =
        viewChild.required<ElementRef<HTMLElement>>('tableViewport');

    public readonly columnList = viewChildren<ElementRef<HTMLDivElement>>('column');

    public scrollbarWidth: number = SCROLLBAR_SIZE;
    public columnListWidth = 0;
    public viewPortInfo: ViewPortInfo = {};
    public tableViewportChecked = true;
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
    public accessDragging = false;
    public filteringRun = false;

    constructor() {
        this.listenToHeightChanges();
    }

    private listenToHeightChanges() {
        effect(() => {
            this._headHeight = this.headHeight();
            this._rowHeight = this.rowHeight();
        });
    }

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
        return this.source() ?? [];
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
        return this.originalSource ?? this.source() ?? [];
    }

    public get isEnableFiltering(): boolean {
        return this.enableFiltering() !== false;
    }

    public get isSkippedInternalSort(): boolean {
        return this.skipSort() !== false;
    }

    public get isEnableAutoWidthColumn(): boolean {
        return this.autoWidth() !== false;
    }

    public get isEnableSelection(): boolean {
        return this.enableSelection() !== false;
    }

    public readonly headHeight = input<number, Nullable<number | string>>(undefined, {
        transform: (value: Nullable<number | string>) => parseInt(value as string, 10),
        alias: 'head-height',
    });

    public readonly rowHeight = input<number, Nullable<number | string>>(undefined, {
        transform: (value: Nullable<number | string>) =>
            parseInt((value ?? ROW_HEIGHT) as string, 10),
        alias: 'row-height',
    });

    private get shouldBeFiltered(): boolean {
        return this.filterable.filterValueExist && this.isEnableFiltering;
    }

    private get shouldBeSorted(): boolean {
        return this.sortable.notEmpty;
    }

    private get expanded(): Nullable<boolean> {
        const headerTemplate = this.headerTemplate();
        const expanded = headerTemplate?.expanded();

        return coerceBoolean(headerTemplate?.expandablePanel()) && isNotNil(expanded)
            ? coerceBoolean(expanded)
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
        if (
            isNotNil(key) &&
            isTrue(this.templateParser.compiledTemplates[key]?.draggable)
        ) {
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

    public resizeColumn({event, key}: ResizeEvent, column: HTMLDivElement): void {
        this.recheckViewportChecked();
        this.disableDragging();

        this.resize.resize(
            event as MouseEvent,
            column,
            (width: number): void => this.calculateWidth(key, width),
            (): void => this.afterCalculateWidth(),
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
        this.selection.rows = this.source();

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

    public drop({previousIndex, currentIndex}: CdkDragSortEvent): void {
        const previousKey: Nullable<string> = this.visibleColumns[previousIndex];
        const currentKey: Nullable<string> = this.visibleColumns[currentIndex];

        this.isDragMoving = false;
        this.draggable.drop(previousKey, currentKey);
        this.changeSchema();
    }

    public changeSchema(
        defaultColumns: Nullable<Array<DeepPartial<ColumnsSchema>>> = null,
    ): void {
        const renderedColumns: Nullable<Array<DeepPartial<ColumnsSchema>>> =
            this.templateParser.schema?.exportColumns();
        const columns: Nullable<Array<DeepPartial<ColumnsSchema>>> =
            defaultColumns ?? renderedColumns;
        const generalTableSettings: GeneralTableSettings = {
            expanded: this.expanded,
        };

        if (isNotNil(columns)) {
            const updateSchema: TableUpdateSchema = {
                columns,
                generalTableSettings,
                name: this.name(),
                version: this.schemaVersion(),
            };

            this.viewChanges.update(updateSchema);
            this.schemaChanges.emit(updateSchema);
            this.idleDetectChanges();
        }
    }

    public idleDetectChanges(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.cancelAnimationFrame(this.idleDetectChangesId ?? 0);
            this.idleDetectChangesId = window.requestAnimationFrame((): void =>
                detectChanges(this.cd),
            );
        });
    }

    public getSelectedItems(): T[] {
        return this.sourceRef.filter((item: T): boolean =>
            isNotNil(this.selectionModel.entries[(item as any)[this.primaryKey()]]),
        );
    }

    protected reCheckDefinitions(): void {
        this.filterable.definition = {...this.filterable.definition};
        this.filterable.changeFilteringStatus();
        this.calculateViewport(true);
        // eslint-disable-next-line no-restricted-properties
        window.setTimeout((): void => {
            if (!this.app.destroyed) {
                this.app.tick();
            }
        }, TIME_RELOAD);
    }

    protected forceCalculateViewport(): void {
        this.updateViewportInfo(
            this.viewPortInfo.startIndex ?? 0,
            this.viewPortInfo.endIndex ?? 0,
        );
    }

    /**
     * @description: returns the number of keys in the model
     * @example: <table-builder [source]=[{ id: 1, name: 'hello' }, ...] /> a value of 2 will be returned
     */
    protected getKeys(): string[] {
        return Object.keys(this.firstItem as PlainObject);
    }

    /**
     * @see AbstractTableBuilderApiDirective#customModelColumnsKeys for further information
     */
    protected generateCustomModelColumnsKeys(): string[] {
        return this.excluding(this.keys());
    }

    /**
     * @see AbstractTableBuilderApiDirective#modelColumnKeys for further information
     */
    protected generateModelColumnKeys(): string[] {
        return this.excluding(this.getModelKeys());
    }

    protected getModelKeys(): string[] {
        return pathsOfObject<PlainObject>(this.firstItem as PlainObject);
    }

    protected calculateColumnWidthSummary(): void {
        if (this.isDragMoving) {
            return;
        }

        this.ngZone.runOutsideAngular((): void => {
            clearInterval(this.columnFrameId ?? 0);
            // eslint-disable-next-line no-restricted-properties
            this.columnFrameId = window.setTimeout((): void => {
                let width = 0;

                for (const element of this.columnList()) {
                    width += element.nativeElement.offsetWidth;
                }

                this.columnListWidth = width;
                this.idleDetectChanges();
            }, TIME_IDLE);
        });
    }

    private async sortAndFilterOriginalSource(): Promise<void> {
        this.source[SIGNAL].value = this.originalSource ?? [];

        if (this.shouldBeFiltered) {
            const filter: FilterWorkerEvent<T> = await this.filterable.filter(
                this.source() ?? [],
            );

            this.source[SIGNAL].value = filter.source;
            filter.fireSelection();
        }

        if (this.shouldBeSorted) {
            this.source[SIGNAL].value = await this.sortable.sort(this.source() ?? []);
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
        this.templateParser.mutateColumnSchema(key, {width});
        this.idleDetectChanges();
    }

    private excluding(keys: string[]): string[] {
        return this.excludeKeys().length > 0
            ? keys.filter(
                  (key: string): boolean =>
                      !this.excludeKeys().some(
                          (excludeKey: ExcludePattern<T>): boolean =>
                              excludeKey instanceof RegExp
                                  ? Boolean(key.match(excludeKey))
                                  : key === excludeKey,
                      ),
              )
            : keys;
    }
}
