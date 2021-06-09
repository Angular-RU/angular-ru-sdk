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
import { fadeInLinearAnimation } from '@angular-ru/common/animations';
import { Any, DeepPartial, PlainObjectOf, SortOrderType } from '@angular-ru/common/typings';
import { checkValueIsFilled, detectChanges, isFalse, isNil, isNotNil } from '@angular-ru/common/utils';
import { EMPTY, fromEvent, Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { AbstractTableBuilderApiDirective } from './abstract-table-builder-api.directive';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { TABLE_GLOBAL_OPTIONS } from './config/table-global-options';
import { CalculateRange, ColumnsSchema } from './interfaces/table-builder.external';
import { RecalculatedStatus, TableSimpleChanges, TemplateKeys } from './interfaces/table-builder.internal';
import { ContextMenuService } from './services/context-menu/context-menu.service';
import { DraggableService } from './services/draggable/draggable.service';
import { FilterableService } from './services/filterable/filterable.service';
import { TableFilterType } from './services/filterable/table-filter-type';
import { ResizableService } from './services/resizer/resizable.service';
import { SelectionService } from './services/selection/selection.service';
import { SortableService } from './services/sortable/sortable.service';
import { NgxTableViewChangesService } from './services/table-view-changes/ngx-table-view-changes.service';
import { TemplateParserService } from './services/template-parser/template-parser.service';

const { TIME_IDLE, TIME_RELOAD, FRAME_TIME, MACRO_TIME }: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

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
    @ViewChild('header', { static: false }) public headerRef!: ElementRef<HTMLDivElement>;
    @ViewChild('footer', { static: false }) public footerRef!: ElementRef<HTMLDivElement>;
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
    protected readonly app: ApplicationRef;
    protected readonly draggable: DraggableService<T>;
    protected readonly viewChanges: NgxTableViewChangesService;
    private forcedRefresh: boolean = false;
    private readonly destroy$: Subject<boolean> = new Subject<boolean>();
    private timeoutCheckedTaskId: number | null = null;
    private timeoutScrolledId: number | null = null;
    private timeoutViewCheckedId: number | null = null;
    private frameCalculateViewportId: number | null = null;
    private selectionUpdateTaskId: number | null = null;

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

    public get selectionEntries(): PlainObjectOf<boolean> {
        return this.selection.selectionModel.entries;
    }

    public get sourceExists(): boolean {
        return this.sourceRef.length > 0;
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

    public checkSourceIsNull(): boolean {
        // eslint-disable-next-line
        return !('length' in (this.source || {}));
    }

    public recalculateHeight(): void {
        this.recalculated = { recalculateHeight: true };
        this.forceCalculateViewport();
        this.idleDetectChanges();
    }

    @HostListener('contextmenu', ['$event'])
    public openContextMenu($event: MouseEvent): void {
        if (this.contextMenuTemplate) {
            this.contextMenu.openContextMenu($event);
        }
    }

    public ngOnChanges(changes: SimpleChanges = {}): void {
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
        (column as Any)['visible'] = visible;
        this.idleDetectChanges();
    }

    public ngAfterContentInit(): void {
        this.markDirtyCheck();
        this.markTemplateContentCheck();

        if (this.sourceExists) {
            this.render();
        }
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
        const preview: HTMLElement = event.source._dragRef['_preview'];
        const top: number = root.getBoundingClientRect().top;
        const transform: string = event.source._dragRef['_preview'].style.transform ?? '';
        const [x, , z]: [number, number, number] = transform
            .replace(/translate3d|\(|\)|px/g, '')
            .split(',')
            .map((val: string): number => parseFloat(val)) as [number, number, number];

        preview.style.transform = `translate3d(${x}px, ${top}px, ${z}px)`;
    }

    public ngAfterViewChecked(): void {
        if (this.viewIsDirty) {
            this.viewForceRefresh();
        }
    }

    public ngOnDestroy(): void {
        window.clearTimeout(this.timeoutScrolledId!);
        window.clearTimeout(this.timeoutViewCheckedId!);
        window.clearTimeout(this.timeoutCheckedTaskId!);
        window.cancelAnimationFrame(this.frameCalculateViewportId!);
        this.templateParser.schema = null;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public markTemplateContentCheck(): void {
        this.contentInit = !!this.source || !(this.columnTemplates && this.columnTemplates.length);
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
        keys.forEach((key: string): void => {
            map[key] = true;
        });

        return map;
    }

    public render(): void {
        this.contentCheck = false;
        this.ngZone.run((): void => {
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

    public toggleColumnVisibility(key?: string | null): void {
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

    public resetSchema(): void {
        this.columnListWidth = 0;
        this.schemaColumns = null;
        detectChanges(this.cd);

        this.renderTable();
        this.changeSchema([]);

        this.ngZone.runOutsideAngular((): void => {
            window.setTimeout((): void => {
                this.tableViewportChecked = true;
                this.calculateColumnWidthSummary();
                detectChanges(this.cd);
            }, TABLE_GLOBAL_OPTIONS.TIME_IDLE);
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

    public setSource(source: T[] | null): void {
        this.originalSource = this.source = this.selection.rows = source;
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
        return bufferOffset <= TABLE_GLOBAL_OPTIONS.BUFFER_OFFSET && bufferOffset >= 0;
    }

    protected recalculateStartIndex(start: number): number {
        const newStart: number = start - TABLE_GLOBAL_OPTIONS.MIN_BUFFER;
        return newStart >= 0 ? newStart : 0;
    }

    protected calculateBuffer(isDownMoved: boolean, start: number, end: number): number {
        const lastVisibleIndex: number = this.getOffsetVisibleEndIndex();
        return isDownMoved
            ? (this.viewPortInfo.endIndex ?? end) - lastVisibleIndex
            : start - this.viewPortInfo.startIndex!;
    }

    protected calculateEndIndex(start: number): number {
        const end: number = start + this.getVisibleCountItems() + TABLE_GLOBAL_OPTIONS.MIN_BUFFER;
        return end > this.sourceRef.length ? this.sourceRef.length : end;
    }

    protected ignoreCalculate(): boolean {
        return !this.source || !this.viewportHeight;
    }

    protected isDownMoved(): boolean {
        return this.scrollOffsetTop > this.viewPortInfo.prevScrollOffsetTop!;
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
            const schemaChange: SimpleChange | undefined = changes[TableSimpleChanges.SCHEMA_COLUMNS];
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
        this.sortable.setDefinition({ ...(this.sortTypes as PlainObjectOf<SortOrderType>) });
        if (this.sourceExists) {
            this.sortAndFilter().then((): void => this.reCheckDefinitions());
        }
    }

    private listenColumnListChanges(): void {
        this.columnList.changes
            .pipe(takeUntil(this.destroy$))
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
        this.filterable.resetEvents.pipe(takeUntil(this.destroy$)).subscribe((): void => {
            this.source = this.originalSource;
            this.calculateViewport(true);
        });
    }

    private afterViewInitChecked(): void {
        this.ngZone.runOutsideAngular((): void => {
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
                    takeUntil(this.destroy$)
                )
                .subscribe((): void => this.scrollHandler());
        });
    }

    private scrollHandler(): void {
        if (!this.needUpdateViewport) {
            return;
        }

        this.ngZone.runOutsideAngular((): void => {
            this.cancelScrolling();
            this.frameCalculateViewportId = window.requestAnimationFrame((): void => this.calculateViewport());
        });
    }

    private cancelScrolling(): void {
        this.viewPortInfo.isScrolling = true;
        window.cancelAnimationFrame(this.frameCalculateViewportId!);
        this.ngZone.runOutsideAngular((): void => {
            window.clearTimeout(this.timeoutScrolledId!);
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
        return Math.ceil(this.scrollOffsetTop / this.clientRowHeight);
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
                this.filterable.filterType ??
                (this.columnOptions && this.columnOptions.filterType) ??
                TableFilterType.CONTAINS;

            this.modelColumnKeys.forEach((key: string): void => {
                (this.filterable.filterTypeDefinition as Any)[key] =
                    (this.filterable.filterTypeDefinition as Any)[key] ?? this.filterable.filterType;
            });
        }
    }

    private recheckTemplateChanges(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.setTimeout((): void => detectChanges(this.cd), TIME_RELOAD);
        });
    }

    private listenSelectionChanges(): void {
        if (this.isEnableSelection) {
            this.selection.onChanges.pipe(takeUntil(this.destroy$)).subscribe((): void => {
                detectChanges(this.cd);
                this.tryRefreshViewModelBySelection();
            });
        }
    }

    private tryRefreshViewModelBySelection(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.cancelAnimationFrame(this.selectionUpdateTaskId!);
            this.selectionUpdateTaskId = window.requestAnimationFrame((): void => this.app.tick());
        });
    }

    private viewForceRefresh(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearTimeout(this.timeoutCheckedTaskId!);
            this.timeoutCheckedTaskId = window.setTimeout((): void => {
                this.forcedRefresh = true;
                this.markTemplateContentCheck();
                this.render();
            }, FRAME_TIME);
        });
    }

    private listenTemplateChanges(): void {
        if (this.columnTemplates) {
            this.columnTemplates.changes.pipe(takeUntil(this.destroy$)).subscribe((): void => {
                this.markForCheck();
                this.markTemplateContentCheck();
            });
        }

        if (this.contextMenuTemplate) {
            this.contextMenu.events.pipe(takeUntil(this.destroy$)).subscribe((): void => detectChanges(this.cd));
        }
    }

    private syncDrawColumns(columnList: string[]): void {
        for (let index: number = 0; index < columnList.length; index++) {
            const key: string = columnList[index] as string;
            const schema: ColumnsSchema | undefined = this.getCompiledColumnSchema(key, index);
            if (schema) {
                this.processedColumnList(schema, columnList[index]);
            }
        }
    }

    private getCustomColumnSchemaByIndex(index: number): Partial<ColumnsSchema> {
        return (this.schemaColumns?.columns && this.schemaColumns?.columns?.[index]) ?? ({} as Any);
    }

    /**
     * @description - it is necessary to combine the templates given from the server and default
     * @param key - column schema from rendered templates map
     * @param index - column position
     */
    private getCompiledColumnSchema(key: string, index: number): ColumnsSchema | undefined {
        const customColumn: Partial<ColumnsSchema> = this.getCustomColumnSchemaByIndex(index);

        if (!this.templateParser.compiledTemplates[key]) {
            const column: NgxColumnComponent<T> = new NgxColumnComponent<T>().withKey(key);
            this.templateParser.compileColumnMetadata(column);
        }

        const defaultColumn: ColumnsSchema | undefined = this.templateParser.compiledTemplates[key];

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
    private processedColumnList(schema: ColumnsSchema, key: string | undefined): void {
        const hasSchema: boolean = checkValueIsFilled((this.templateParser.schema ?? schema) as Any);

        if (hasSchema) {
            const compiledSchema: ColumnsSchema | undefined = this.templateParser.compiledTemplates[key as string];
            if (compiledSchema) {
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
            window.setTimeout((): void => {
                this.isRendered = true;
                detectChanges(this.cd);
                this.recalculateHeight();
                this.afterRendered.emit(this.isRendered);
                this.onChanges.emit(this.source || null);
            }, TIME_RELOAD);
        });
    }

    /**
     * @description: parsing templates and input parameters (keys, schemaColumns) for the number of columns
     */
    private generateDisplayedColumns(): string[] {
        let generatedList: string[];
        this.templateParser.initialSchema(this.columnOptions!);
        const { simpleRenderedKeys, allRenderedKeys }: TemplateKeys = this.parseTemplateKeys();
        const isValid: boolean = this.validationSchemaColumnsAndResetIfInvalid();

        if (isValid) {
            generatedList =
                this.schemaColumns?.columns?.map(
                    (column: DeepPartial<ColumnsSchema>): string => column.key as string
                ) ?? [];
        } else if (this.keys.length) {
            generatedList = this.customModelColumnsKeys;
        } else if (simpleRenderedKeys.size) {
            generatedList = allRenderedKeys;
        } else {
            generatedList = this.modelColumnKeys;
        }

        return generatedList;
    }

    // eslint-disable-next-line max-lines-per-function
    private validationSchemaColumnsAndResetIfInvalid(): boolean {
        let isValid: boolean = !!this.schemaColumns && !!this.schemaColumns.columns?.length;

        if (isValid) {
            const nameIsValid: boolean = this.schemaColumns?.name === this.name;
            const versionIsValid: boolean = this.schemaColumns?.version === this.schemaVersion;
            const invalid: boolean = !nameIsValid || !versionIsValid;

            if (invalid) {
                isValid = false;
                console.error(
                    'The table name or version is mismatched by your schema, your schema will be reset.',
                    'Current name: ',
                    this.name,
                    'Current version: ',
                    this.schemaVersion,
                    'Schema: ',
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
    private parseTemplateKeys(): TemplateKeys {
        this.templateParser.keyMap = this.generateColumnsKeyMap(this.keys.length ? this.keys : this.getModelKeys());

        this.templateParser.allowedKeyMap = this.keys.length
            ? this.generateColumnsKeyMap(this.customModelColumnsKeys)
            : this.generateColumnsKeyMap(this.modelColumnKeys);

        this.templateParser.parse(this.columnTemplates!);

        return {
            allRenderedKeys: Array.from(this.templateParser.fullTemplateKeys!),
            overridingRenderedKeys: this.templateParser.overrideTemplateKeys!,
            simpleRenderedKeys: this.templateParser.templateKeys!
        };
    }
}
