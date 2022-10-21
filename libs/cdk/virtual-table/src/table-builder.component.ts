import { CdkDragStart } from '@angular/cdk/drag-drop';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Injector,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChange,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { fadeInLinearAnimation } from '@angular-ru/cdk/animations';
import { hasItems } from '@angular-ru/cdk/array';
import { coerceBoolean } from '@angular-ru/cdk/coercion';
import { DeepPartial, Nullable, PlainObjectOf, SortOrderType } from '@angular-ru/cdk/typings';
import { checkValueIsFilled, detectChanges, isFalse, isFalsy, isNil, isNotNil } from '@angular-ru/cdk/utils';
import { EMPTY, fromEvent, Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { AbstractTableBuilderApiDirective } from './abstract-table-builder-api.directive';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { TABLE_GLOBAL_OPTIONS } from './config/table-global-options';
import { AutoHeightDirective } from './directives/auto-height.directive';
import { CalculateRange, ColumnsSchema } from './interfaces/table-builder.external';
import { RecalculatedStatus, RowId, TableSimpleChanges, TemplateKeys } from './interfaces/table-builder.internal';
import { getClientHeight } from './operators/get-client-height';
import { ContextMenuService } from './services/context-menu/context-menu.service';
import { DraggableService } from './services/draggable/draggable.service';
import { FilterableService } from './services/filterable/filterable.service';
import { TableFilterType } from './services/filterable/table-filter-type';
import { ResizableService } from './services/resizer/resizable.service';
import { SelectionService } from './services/selection/selection.service';
import { SortableService } from './services/sortable/sortable.service';
import { NgxTableViewChangesService } from './services/table-view-changes/ngx-table-view-changes.service';
import { TemplateParserService } from './services/template-parser/template-parser.service';

const {
    TIME_IDLE,
    TIME_RELOAD,
    FRAME_TIME,
    MACRO_TIME,
    CHANGE_DELAY,
    MIN_BUFFER,
    BUFFER_OFFSET
}: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

@Component({
    selector: 'ngx-table-builder',
    templateUrl: './table-builder.component.html',
    styleUrls: ['./table-builder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TemplateParserService,
        SortableService,
        SelectionService,
        ResizableService,
        ContextMenuService,
        FilterableService,
        DraggableService
    ],
    encapsulation: ViewEncapsulation.None,
    animations: [fadeInLinearAnimation]
})
export class TableBuilderComponent<T>
    extends AbstractTableBuilderApiDirective<T>
    implements OnChanges, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy
{
    private forcedRefresh: boolean = false;
    private readonly _destroy$: Subject<boolean> = new Subject<boolean>();
    private timeoutCheckedTaskId: Nullable<number> = null;
    private timeoutScrolledId: Nullable<number> = null;
    private timeoutViewCheckedId: Nullable<number> = null;
    private frameCalculateViewportId: Nullable<number> = null;
    private selectionUpdateTaskId: Nullable<number> = null;
    private changesTimerId: number = 0;
    protected readonly app: ApplicationRef;
    protected readonly draggable: DraggableService<T>;
    protected readonly viewChanges: NgxTableViewChangesService;
    @ViewChild('header', { static: false }) public headerRef!: ElementRef<HTMLDivElement>;
    @ViewChild('footer', { static: false }) public footerRef!: ElementRef<HTMLDivElement>;
    @ViewChild(AutoHeightDirective, { static: false }) public readonly autoHeight!: AutoHeightDirective<T>;
    public dirty: boolean = true;
    public rendering: boolean = false;
    public isRendered: boolean = false;
    public contentInit: boolean = false;
    public contentCheck: boolean = false;
    public recalculated: RecalculatedStatus = { recalculateHeight: false };
    public sourceIsNull: boolean = false;
    public afterViewInitDone: boolean = false;
    public readonly selection: SelectionService<T>;
    public readonly templateParser: TemplateParserService<T>;
    public readonly ngZone: NgZone;
    public readonly resize: ResizableService;
    public readonly sortable: SortableService<T>;
    public readonly contextMenu: ContextMenuService<T>;
    public readonly filterable: FilterableService<T>;

    constructor(public readonly cd: ChangeDetectorRef, injector: Injector) {
        super();
        this.selection = injector.get<SelectionService<T>>(SelectionService);
        this.templateParser = injector.get<TemplateParserService<T>>(TemplateParserService);
        this.ngZone = injector.get<NgZone>(NgZone);
        this.resize = injector.get<ResizableService>(ResizableService);
        this.sortable = injector.get<SortableService<T>>(SortableService);
        this.contextMenu = injector.get<ContextMenuService<T>>(ContextMenuService);
        this.app = injector.get<ApplicationRef>(ApplicationRef);
        this.filterable = injector.get<FilterableService<T>>(FilterableService);
        this.draggable = injector.get<DraggableService<T>>(DraggableService);
        this.viewChanges = injector.get<NgxTableViewChangesService>(NgxTableViewChangesService);
    }

    public get destroy$(): Subject<boolean> {
        return this._destroy$;
    }

    public get selectedKeyList(): RowId[] {
        return this.selection.selectionModel.selectedList;
    }

    /** @deprecated
     * Use `selectedKeyList` instead
     */
    public get selectionEntries(): PlainObjectOf<boolean> {
        return this.selection.selectionModel.entries;
    }

    public get sourceExists(): boolean {
        return this.sourceRef.length > 0;
    }

    public get rootHeight(): string {
        const height: Nullable<string | number> = this.expandableTableExpanded
            ? this.height
            : getClientHeight(this.headerRef) + getClientHeight(this.footerRef);

        if (checkValueIsFilled(height)) {
            const heightAsNumber: number = Number(height);

            return isNaN(heightAsNumber) ? String(height) : `${height}px`;
        } else {
            return '';
        }
    }

    private get expandableTableExpanded(): boolean {
        return (
            isNil(this.headerTemplate) ||
            !coerceBoolean(this.headerTemplate.expandablePanel) ||
            coerceBoolean(this.headerTemplate.expanded)
        );
    }

    private get viewIsDirty(): boolean {
        return this.contentCheck && !this.forcedRefresh;
    }

    private get needUpdateViewport(): boolean {
        return this.viewPortInfo.prevScrollOffsetTop !== this.scrollOffsetTop;
    }

    private get viewportHeight(): number {
        return this.scrollContainer.nativeElement.offsetHeight;
    }

    private get scrollOffsetTop(): number {
        return this.scrollContainer.nativeElement.scrollTop;
    }

    private get nonIdenticalStructure(): boolean {
        return this.sourceExists && this.getCountKeys() !== this.renderedCountKeys;
    }

    @HostListener('contextmenu', ['$event'])
    public openContextMenu($event: MouseEvent): void {
        if (isNotNil(this.contextMenuTemplate)) {
            this.contextMenu.openContextMenu($event);
        }
    }

    public openContextMenuWithKey($event: Event, key: Nullable<string>): void {
        if (isNotNil(this.contextMenuTemplate)) {
            this.contextMenu.openContextMenu($event as MouseEvent, key);
        }
    }

    public checkSourceIsNull(): boolean {
        // eslint-disable-next-line
        return !('length' in (this.source || {}));
    }

    public recalculateHeight(): void {
        this.recalculated = { recalculateHeight: true };
        this.forceCalculateViewport();
        this.idleDetectChanges();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.checkCorrectInitialSchema(changes);

        this.sourceIsNull = this.checkSourceIsNull();

        if (TableSimpleChanges.SKIP_SORT in changes) {
            this.sortable.setSkipSort(this.isSkippedInternalSort);
        }

        if (this.nonIdenticalStructure) {
            this.preRenderTable();
        } else if (TableSimpleChanges.SOURCE_KEY in changes && this.isRendered) {
            this.preSortAndFilterTable();
        }

        if (TableSimpleChanges.SORT_TYPES in changes) {
            this.setSortTypes();
        }

        this.handleFilterDefinitionChanges(changes);

        clearTimeout(this.changesTimerId);
        // eslint-disable-next-line no-restricted-properties
        this.changesTimerId = window.setTimeout((): void => this.updateViewport(), CHANGE_DELAY);
    }

    public markForCheck(): void {
        this.contentCheck = true;
    }

    public ngOnInit(): void {
        if (this.isEnableSelection) {
            this.selection.listenShiftKey();
            this.selection.primaryKey = this.primaryKey;
            this.selection.selectionModeIsEnabled = true;
            this.selection.setProducerDisableFn(this.produceDisableFn);
        }

        this.sortable.setSortChanges(this.sortChanges);
    }

    public markVisibleColumn(column: HTMLDivElement, visible: boolean): void {
        (column as any).visible = visible;
        this.idleDetectChanges();
    }

    public ngAfterContentInit(): void {
        this.markDirtyCheck();
        this.markTemplateContentCheck();

        if (this.sourceExists) {
            this.render();
        }

        this.listenExpandChange();
    }

    public ngAfterViewInit(): void {
        this.listenTemplateChanges();
        this.listenFilterResetChanges();
        this.listenSelectionChanges();
        this.listenColumnListChanges();
        this.recheckTemplateChanges();
        this.afterViewInitChecked();
    }

    public cdkDragMoved(event: CdkDragStart, root: HTMLElement): void {
        this.isDragMoving = true;
        // eslint-disable-next-line @typescript-eslint/dot-notation
        const preview: HTMLElement = event.source._dragRef['_preview'];
        const top: number = root.getBoundingClientRect().top;
        // eslint-disable-next-line @typescript-eslint/dot-notation
        const transform: string = event.source._dragRef['_preview'].style.transform ?? '';
        const [x, , z]: [number, number, number] = transform
            .replace(/translate3d|\(|\)|px/g, '')
            .split(',')
            .map((value: string): number => parseFloat(value)) as [number, number, number];

        preview.style.transform = `translate3d(${x}px, ${top}px, ${z}px)`;
    }

    public ngAfterViewChecked(): void {
        if (this.viewIsDirty) {
            this.viewForceRefresh();
        }
    }

    public ngOnDestroy(): void {
        window.clearTimeout(this.timeoutScrolledId ?? 0);
        window.clearTimeout(this.timeoutViewCheckedId ?? 0);
        window.clearTimeout(this.timeoutCheckedTaskId ?? 0);
        window.cancelAnimationFrame(this.frameCalculateViewportId ?? 0);
        this.templateParser.schema = null;
        this._destroy$.next(true);

        /**
         * @description
         * If you want an Observable to be done with his task, you call observable.complete().
         * This only exists on Subject and those who extend Subject.
         * The complete method in itself will also unsubscribe any possible subscriptions.
         */
        this._destroy$.complete();
    }

    public markTemplateContentCheck(): void {
        this.contentInit = isNotNil(this.source) || isFalsy(this.columnTemplates?.length);
    }

    public markDirtyCheck(): void {
        this.dirty = false;
    }

    /**
     * @internal
     * @description: Key table generation for internal use
     * @sample: keys - ['id', 'value'] -> { id: true, value: true }
     */
    public generateColumnsKeyMap(keys: string[]): PlainObjectOf<boolean> {
        const map: PlainObjectOf<boolean> = {};

        for (const key of keys) {
            map[key] = true;
        }

        return map;
    }

    public render(): void {
        this.contentCheck = false;
        this.ngZone.run((): void => {
            // eslint-disable-next-line no-restricted-properties
            window.setTimeout((): void => {
                this.renderTable();
                this.idleDetectChanges();
            }, TIME_IDLE);
        });
    }

    public renderTable(): void {
        if (this.rendering) {
            return;
        }

        this.rendering = true;
        const columnList: string[] = this.generateDisplayedColumns();

        if (this.sortable.notEmpty) {
            this.sortAndFilter().then((): void => {
                this.syncDrawColumns(columnList);
                this.emitRendered();
            });
        } else {
            this.syncDrawColumns(columnList);
            this.emitRendered();
        }
    }

    public toggleColumnVisibility(key?: Nullable<string>): void {
        if (isNotNil(key)) {
            this.recheckViewportChecked();
            this.templateParser.toggleColumnVisibility(key);
            this.ngZone.runOutsideAngular((): void => {
                window.requestAnimationFrame((): void => {
                    this.changeSchema();
                    this.recheckViewportChecked();
                    detectChanges(this.cd);
                });
            });
        }
    }

    public updateColumnsSchema(patch: PlainObjectOf<Partial<ColumnsSchema>>): void {
        this.templateParser.updateColumnsSchema(patch);
        this.changeSchema();
    }

    public resetSchema(): void {
        this.columnListWidth = 0;
        this.schemaColumns = null;
        detectChanges(this.cd);

        this.renderTable();
        this.changeSchema([]);

        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            window.setTimeout((): void => {
                this.tableViewportChecked = true;
                this.calculateColumnWidthSummary();
                detectChanges(this.cd);
            }, TIME_IDLE);
        });
    }

    public calculateViewport(force: boolean = false): void {
        if (this.ignoreCalculate()) {
            return;
        }

        const isDownMoved: boolean = this.isDownMoved();

        this.viewPortInfo.prevScrollOffsetTop = this.scrollOffsetTop;
        const start: number = this.getOffsetVisibleStartIndex();
        const end: number = this.calculateEndIndex(start);
        const bufferOffset: number = this.calculateBuffer(isDownMoved, start, end);

        this.calculateViewPortByRange({ start, end, bufferOffset, force });
        this.viewPortInfo.bufferOffset = bufferOffset;
    }

    public setSource(source: Nullable<T[]>): void {
        this.originalSource = this.source = this.selection.rows = source;
    }

    public updateTableHeight(): void {
        this.autoHeight.calculateHeight();
        detectChanges(this.cd);
    }

    public filterBySubstring(substring: Nullable<any>): void {
        this.filterable.filterValue = substring?.toString();
        this.filter();
    }

    protected calculateViewPortByRange({ start, end, bufferOffset, force }: CalculateRange): void {
        let newStartIndex: number = start;

        if (this.startIndexIsNull()) {
            this.updateViewportInfo(newStartIndex, end);
        } else if (this.needRecalculateBuffer(bufferOffset)) {
            newStartIndex = this.recalculateStartIndex(newStartIndex);
            this.updateViewportInfo(newStartIndex, end);
            detectChanges(this.cd);
        } else if (bufferOffset < 0 || force) {
            newStartIndex = this.recalculateStartIndex(newStartIndex);
            this.updateViewportInfo(newStartIndex, end);
            detectChanges(this.cd);

            return;
        }

        if (force) {
            this.idleDetectChanges();
        }
    }

    protected startIndexIsNull(): boolean {
        return typeof this.viewPortInfo.startIndex !== 'number';
    }

    protected needRecalculateBuffer(bufferOffset: number): boolean {
        return bufferOffset <= BUFFER_OFFSET && bufferOffset >= 0;
    }

    protected recalculateStartIndex(start: number): number {
        const newStart: number = start - MIN_BUFFER;

        return newStart >= 0 ? newStart : 0;
    }

    protected calculateBuffer(isDownMoved: boolean, start: number, end: number): number {
        const lastVisibleIndex: number = this.getOffsetVisibleEndIndex();

        return isDownMoved
            ? (this.viewPortInfo.endIndex ?? end) - lastVisibleIndex
            : start - (this.viewPortInfo.startIndex ?? 0);
    }

    protected calculateEndIndex(start: number): number {
        const end: number = start + this.getVisibleCountItems() + MIN_BUFFER;

        return !this.isVirtualTable || end > this.sourceRef.length ? this.sourceRef.length : end;
    }

    protected ignoreCalculate(): boolean {
        return isNil(this.source) || !this.viewportHeight;
    }

    protected isDownMoved(): boolean {
        return this.scrollOffsetTop > (this.viewPortInfo.prevScrollOffsetTop ?? 0);
    }

    protected updateViewportInfo(start: number, end: number): void {
        this.viewPortInfo.startIndex = start;
        this.viewPortInfo.endIndex = end;
        this.viewPortInfo.indexes = [];
        this.viewPortInfo.virtualIndexes = [];

        for (let i: number = start, even: number = 2; i < end; i++) {
            this.viewPortInfo.indexes.push(i);
            this.viewPortInfo.virtualIndexes.push({
                position: i,
                stripped: this.striped ? i % even === 0 : false,
                offsetTop: i * this.clientRowHeight
            });
        }

        this.createDiffIndexes();
        this.viewPortInfo.scrollTop = start * this.clientRowHeight;
    }

    private checkCorrectInitialSchema(changes: SimpleChanges = {}): void {
        if (TableSimpleChanges.SCHEMA_COLUMNS in changes) {
            const schemaChange: Nullable<SimpleChange> = changes[TableSimpleChanges.SCHEMA_COLUMNS];

            if (isNotNil(schemaChange?.currentValue)) {
                if (isNil(this.name)) {
                    console.error(`Table name is required! Example: <ngx-table-builder name="my-table-name" />`);
                }

                if (isNil(this.schemaVersion)) {
                    console.error(`Table version is required! Example: <ngx-table-builder [schema-version]="2" />`);
                }
            }
        }
    }

    private setSortTypes(): void {
        this.sortable.setDefinition({ ...this.sortTypes } as PlainObjectOf<SortOrderType>);

        if (this.sourceExists) {
            this.sortAndFilter().then((): void => this.reCheckDefinitions());
        }
    }

    private handleFilterDefinitionChanges(changes: SimpleChanges): void {
        if (TableSimpleChanges.FILTER_DEFINITION in changes) {
            this.filterable.setDefinition(this.filterDefinition ?? []);
            this.filter();
        }
    }

    private listenColumnListChanges(): void {
        this.columnList.changes
            .pipe(takeUntil(this._destroy$))
            .subscribe((): void => this.calculateColumnWidthSummary());
    }

    private createDiffIndexes(): void {
        this.viewPortInfo.diffIndexes = this.viewPortInfo.oldIndexes
            ? this.viewPortInfo.oldIndexes.filter((index: number): boolean =>
                  isFalse(this.viewPortInfo.indexes?.includes(index) ?? false)
              )
            : [];

        this.viewPortInfo.oldIndexes = this.viewPortInfo.indexes;
    }

    private listenFilterResetChanges(): void {
        this.filterable.resetEvents$.pipe(takeUntil(this._destroy$)).subscribe((): void => {
            this.source = this.originalSource;
            this.calculateViewport(true);
        });
    }

    private afterViewInitChecked(): void {
        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.timeoutViewCheckedId = window.setTimeout((): void => {
                this.afterViewInitDone = true;
                this.listenScroll();

                if (!this.isRendered && !this.rendering && this.sourceRef.length === 0) {
                    this.emitRendered();
                    detectChanges(this.cd);
                }
            }, MACRO_TIME);
        });
    }

    private listenScroll(): void {
        this.ngZone.runOutsideAngular((): void => {
            fromEvent(this.scrollContainer.nativeElement, 'scroll', { passive: true })
                .pipe(
                    catchError((): Observable<never> => {
                        this.calculateViewport(true);

                        return EMPTY;
                    }),
                    takeUntil(this._destroy$)
                )
                .subscribe((): void => this.scrollHandler());
        });
    }

    private scrollHandler(): void {
        if (!this.needUpdateViewport) {
            return;
        }

        this.ngZone.runOutsideAngular((): void => this.updateViewport());
    }

    private updateViewport(): void {
        this.cancelScrolling();
        this.frameCalculateViewportId = window.requestAnimationFrame((): void => this.calculateViewport());
    }

    private cancelScrolling(): void {
        this.viewPortInfo.isScrolling = true;
        window.cancelAnimationFrame(this.frameCalculateViewportId ?? 0);
        this.ngZone.runOutsideAngular((): void => {
            window.clearTimeout(this.timeoutScrolledId ?? 0);
            // eslint-disable-next-line no-restricted-properties
            this.timeoutScrolledId = window.setTimeout((): void => {
                this.viewPortInfo.isScrolling = false;
                detectChanges(this.cd);
            }, TIME_RELOAD);
        });
    }

    private getOffsetVisibleEndIndex(): number {
        return Math.floor((this.scrollOffsetTop + this.viewportHeight) / this.clientRowHeight) - 1;
    }

    private getVisibleCountItems(): number {
        return Math.ceil(this.viewportHeight / this.clientRowHeight - 1);
    }

    private getOffsetVisibleStartIndex(): number {
        return this.isVirtualTable ? Math.ceil(this.scrollOffsetTop / this.clientRowHeight) : 0;
    }

    private preSortAndFilterTable(): void {
        this.setSource(this.source);
        this.sortAndFilter().then((): void => {
            this.reCheckDefinitions();
            this.checkSelectionValue();
        });
    }

    private preRenderTable(): void {
        this.tableViewportChecked = false;
        this.renderedCountKeys = this.getCountKeys();
        this.customModelColumnsKeys = this.generateCustomModelColumnsKeys();
        this.modelColumnKeys = this.generateModelColumnKeys();
        this.setSource(this.source);
        const unDirty: boolean = !this.dirty;

        this.checkSelectionValue();
        this.checkFilterValues();

        if (unDirty) {
            this.markForCheck();
        }

        const recycleView: boolean = unDirty && this.isRendered && this.contentInit;

        if (recycleView) {
            this.renderTable();
        }
    }

    private checkSelectionValue(): void {
        if (this.isEnableSelection) {
            this.selection.invalidate();
        }
    }

    private checkFilterValues(): void {
        if (this.isEnableFiltering) {
            this.filterable.filterType =
                this.filterable.filterType ?? this.columnOptions?.filterType ?? TableFilterType.CONTAINS;

            for (const key of this.modelColumnKeys) {
                (this.filterable.filterTypeDefinition as any)[key] =
                    (this.filterable.filterTypeDefinition as any)[key] ?? this.filterable.filterType;
            }
        }
    }

    private recheckTemplateChanges(): void {
        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            window.setTimeout((): void => detectChanges(this.cd), TIME_RELOAD);
        });
    }

    private listenSelectionChanges(): void {
        if (this.isEnableSelection) {
            this.selection.onChanges$.pipe(takeUntil(this._destroy$)).subscribe((): void => {
                detectChanges(this.cd);
                this.tryRefreshViewModelBySelection();
            });
        }
    }

    private tryRefreshViewModelBySelection(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.cancelAnimationFrame(this.selectionUpdateTaskId ?? 0);
            this.selectionUpdateTaskId = window.requestAnimationFrame((): void => this.app.tick());
        });
    }

    private viewForceRefresh(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearTimeout(this.timeoutCheckedTaskId ?? 0);
            // eslint-disable-next-line no-restricted-properties
            this.timeoutCheckedTaskId = window.setTimeout((): void => {
                this.forcedRefresh = true;
                this.markTemplateContentCheck();
                this.render();
            }, FRAME_TIME);
        });
    }

    private listenTemplateChanges(): void {
        if (isNotNil(this.columnTemplates)) {
            this.columnTemplates.changes.pipe(takeUntil(this._destroy$)).subscribe((): void => {
                this.markForCheck();
                this.markTemplateContentCheck();
            });
        }

        if (isNotNil(this.contextMenuTemplate)) {
            this.contextMenu.events$.pipe(takeUntil(this._destroy$)).subscribe((): void => detectChanges(this.cd));
        }
    }

    private syncDrawColumns(columnList: string[]): void {
        for (const [index, key] of columnList.entries()) {
            const schema: Nullable<ColumnsSchema> = this.getCompiledColumnSchema(key, index);

            if (isNotNil(schema)) {
                this.processedColumnList(schema, key);
            }
        }
    }

    private getCustomColumnSchemaByIndex(index: number): Partial<ColumnsSchema> {
        return this.schemaColumns?.columns?.[index] ?? ({} as any);
    }

    /**
     * @description - it is necessary to combine the templates given from the server and default
     * @param key - column schema from rendered templates map
     * @param index - column position
     */
    private getCompiledColumnSchema(key: string, index: number): Nullable<ColumnsSchema> {
        const customColumn: Partial<ColumnsSchema> = this.getCustomColumnSchemaByIndex(index);

        if (!this.templateParser.compiledTemplates[key]) {
            const column: NgxColumnComponent<T> = new NgxColumnComponent<T>().withKey(key);

            this.templateParser.compileColumnMetadata(column);
        }

        const defaultColumn: Nullable<ColumnsSchema> = this.templateParser.compiledTemplates[key];

        if (customColumn.key === defaultColumn?.key) {
            this.templateParser.compiledTemplates[key] = { ...defaultColumn, ...customColumn } as ColumnsSchema;
        }

        return this.templateParser.compiledTemplates[key];
    }

    /**
     * TODO: the schema is not used anything
     * @description: column meta information processing
     * @param schema - column schema
     * @param key - column name
     */
    private processedColumnList(schema: ColumnsSchema, key: Nullable<string>): void {
        const hasSchema: boolean = checkValueIsFilled((this.templateParser.schema ?? schema) as any);

        if (hasSchema) {
            const compiledSchema: Nullable<ColumnsSchema> = this.templateParser.compiledTemplates[key as string];

            if (isNotNil(compiledSchema)) {
                this.templateParser.schema?.columns.push(compiledSchema);
            }
        }
    }

    /**
     * @description: notification that the table has been rendered
     * @see TableBuilderComponent#isRendered
     */
    private emitRendered(): void {
        this.rendering = false;
        this.calculateViewport(true);
        this.recheckViewportChecked();
        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            window.setTimeout((): void => {
                this.isRendered = true;
                detectChanges(this.cd);
                this.recalculateHeight();
                this.afterRendered.emit(this.isRendered);
                this.onChanges.emit(this.source ?? null);
            }, TIME_RELOAD);
        });
    }

    /**
     * @description: parsing templates and input parameters (keys, schemaColumns) for the number of columns
     */
    private generateDisplayedColumns(): string[] {
        let generatedList: string[];

        this.templateParser.initialSchema(this.columnOptions);
        const { simpleRenderedKeys, allRenderedKeys }: TemplateKeys = this.parseTemplateKeys();
        const isValid: boolean = this.validationSchemaColumnsAndResetIfInvalid();

        if (isValid) {
            generatedList =
                this.schemaColumns?.columns?.map(
                    (column: DeepPartial<ColumnsSchema>): string => column.key as string
                ) ?? [];
        } else if (this.keys.length > 0) {
            generatedList = this.customModelColumnsKeys;
        } else if (simpleRenderedKeys.size > 0) {
            generatedList = allRenderedKeys;
        } else {
            generatedList = this.modelColumnKeys;
        }

        return generatedList;
    }

    // eslint-disable-next-line max-lines-per-function
    private validationSchemaColumnsAndResetIfInvalid(): boolean {
        let isValid: boolean = isNotNil(this.schemaColumns) && (this.schemaColumns?.columns?.length ?? 0) > 0;

        if (isValid) {
            const nameIsValid: boolean = this.schemaColumns?.name === this.name;
            const versionIsValid: boolean = this.schemaColumns?.version === this.schemaVersion;
            const invalid: boolean = !nameIsValid || !versionIsValid;

            if (invalid) {
                isValid = false;
                console.error(
                    'The table name or version is mismatched by your schema, your schema will be reset.',
                    'Current name:',
                    this.name,
                    'Current version:',
                    this.schemaVersion,
                    'Schema:',
                    this.schemaColumns
                );

                this.changeSchema([]);
            }
        }

        return isValid;
    }

    /**
     * @description: this method returns the keys by which to draw table columns
     * <allowedKeyMap> - possible keys from the model, this must be checked,
     * because users can draw the wrong keys in the template (ngx-column key=invalid)
     */
    // eslint-disable-next-line complexity
    private parseTemplateKeys(): TemplateKeys {
        const modelKeys: string[] = this.getModelKeys();
        const keys: string[] = hasItems(this.keys)
            ? this.keys.filter((key: string): boolean => modelKeys.includes(key))
            : modelKeys;

        this.templateParser.keyMap = this.generateColumnsKeyMap(keys);

        this.templateParser.allowedKeyMap =
            this.keys.length > 0
                ? this.generateColumnsKeyMap(this.customModelColumnsKeys)
                : this.generateColumnsKeyMap(this.modelColumnKeys);

        this.templateParser.parse(this.columnTemplates);

        return {
            allRenderedKeys: Array.from(this.templateParser.fullTemplateKeys ?? []) ?? new Set(),
            overridingRenderedKeys: this.templateParser.overrideTemplateKeys ?? new Set(),
            simpleRenderedKeys: this.templateParser.templateKeys ?? new Set()
        };
    }

    private listenExpandChange(): void {
        this.headerTemplate?.expandedChange.pipe(takeUntil(this._destroy$)).subscribe((): void => {
            this.updateTableHeight();
            this.changeSchema();
        });
    }
}
