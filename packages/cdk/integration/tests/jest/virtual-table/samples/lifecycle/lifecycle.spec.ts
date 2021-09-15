import { ApplicationRef, ChangeDetectorRef, ElementRef, NgZone, QueryList, SimpleChanges } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { deepClone } from '@angular-ru/cdk/object';
import { Any, Fn, Nullable, PlainObject } from '@angular-ru/cdk/typings';
import { NgxColumnComponent, NgxTableViewChangesService, TableBuilderComponent } from '@angular-ru/cdk/virtual-table';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';

import { MapToTableEntriesPipe } from '../../../../../../virtual-table/src/pipes/map-to-table-entries.pipe';
import { TableSelectedItemsPipe } from '../../../../../../virtual-table/src/pipes/table-selected-items.pipe';
import { ContextMenuService } from '../../../../../../virtual-table/src/services/context-menu/context-menu.service';
import { DraggableService } from '../../../../../../virtual-table/src/services/draggable/draggable.service';
import { FilterableService } from '../../../../../../virtual-table/src/services/filterable/filterable.service';
import { ResizableService } from '../../../../../../virtual-table/src/services/resizer/resizable.service';
import { SelectionService } from '../../../../../../virtual-table/src/services/selection/selection.service';
import { SortableService } from '../../../../../../virtual-table/src/services/sortable/sortable.service';
import { TemplateParserService } from '../../../../../../virtual-table/src/services/template-parser/template-parser.service';

describe('[TEST]: Lifecycle table', () => {
    let table: TableBuilderComponent<PlainObject>;
    let sortable: SortableService<PlainObject>;
    let draggable: DraggableService<PlainObject>;
    let resizeService: ResizableService;
    let changes: SimpleChanges;

    const mockChangeDetector: Partial<ChangeDetectorRef> = {
        detectChanges: (): void => {
            // ...
        }
    };

    const appRef: Partial<ApplicationRef> = {
        tick: (): void => {
            // ...
        }
    };
    const mockNgZone: Partial<NgZone> = {
        run: (callback: Fn): Any => callback(),
        runOutsideAngular: (callback: Fn): Any => callback()
    };
    const webWorker: Partial<WebWorkerThreadService> = {
        run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
            return Promise.resolve(workerFunction(data!));
        }
    };

    interface PeriodicElement {
        name: Nullable<string>;
        position: number;
        weight: number;
        symbol: string;
    }

    // noinspection DuplicatedCode
    const data: PeriodicElement[] = [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
        { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
        { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
        { position: 8, name: null, weight: 15.9994, symbol: 'O' },
        { position: 9, name: null, weight: 18.9984, symbol: 'F' },
        { position: 10, name: null, weight: 20.1797, symbol: 'Ne' }
    ];

    beforeEach(() => {
        const worker: WebWorkerThreadService = webWorker as WebWorkerThreadService;
        const zone: NgZone = mockNgZone as NgZone;
        const app: ApplicationRef = appRef as ApplicationRef;
        const view: NgxTableViewChangesService = new NgxTableViewChangesService();

        const parser: TemplateParserService<PlainObject> = new TemplateParserService();

        draggable = new DraggableService(parser);

        resizeService = new ResizableService();

        // @ts-ignore
        sortable = new SortableService(worker, zone);

        table = new TableBuilderComponent(mockChangeDetector as ChangeDetectorRef, {
            // eslint-disable-next-line complexity
            get(token: Any): Any {
                switch (token) {
                    case SelectionService:
                        return new SelectionService(zone);
                    case TemplateParserService:
                        return parser;
                    case NgZone:
                        return zone;
                    case ResizableService:
                        return resizeService;
                    case SortableService:
                        return sortable;
                    case ContextMenuService:
                        return new ContextMenuService();
                    case ApplicationRef:
                        return app;
                    case FilterableService:
                        return new FilterableService({
                            get(_token: Any): Any {
                                // eslint-disable-next-line sonarjs/no-nested-switch
                                switch (_token) {
                                    case ApplicationRef:
                                        return app;
                                    case WebWorkerThreadService:
                                        return worker;
                                    case NgZone:
                                        return zone;
                                }
                            }
                        });
                    case DraggableService:
                        return draggable;
                    case NgxTableViewChangesService:
                        return view;
                }
            }
        });

        table.scrollContainer = {
            nativeElement: {
                offsetHeight: 900
            } as unknown as HTMLElement
        };

        table.primaryKey = 'position';
        changes = {};

        table.columnList = new QueryList<ElementRef<HTMLDivElement>>();
    });

    it('should be basic api', async () => {
        table.setSource(deepClone(data));

        expect(new TableSelectedItemsPipe(table).transform({ 1: true, 2: true })).toEqual([
            { position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079 },
            { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' }
        ]);

        // expect MapToTableEntriesPipe pipe works
        expect(new MapToTableEntriesPipe(table).transform([1, 2])).toEqual([
            { position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079 },
            { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' }
        ]);

        // expect MapToTableEntriesPipe pipe works with another ordering
        expect(new MapToTableEntriesPipe(table).transform([2, 1])).toEqual([
            { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
            { position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079 }
        ]);

        // enable and check filter
        table.enableFiltering = true;
        table.filterable.filterValue = 'Hydrogen';
        table.filterable.filterType = 'START_WITH';
        await table.sortAndFilter();
        expect(table.source).toEqual([{ name: 'Hydrogen', position: 1, symbol: 'H', weight: 1.0079 }]);

        // expect selection pipe works even with filtered values
        expect(new TableSelectedItemsPipe(table).transform({})).toEqual([]);
        expect(new TableSelectedItemsPipe(table).transform({ 1: true, 2: true })).toEqual([
            { position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079 },
            { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' }
        ]);

        expect(table.lastItem).toEqual({ position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079 });

        // reset filter
        table.enableFiltering = true;
        table.filterable.filterValue = null;
        table.filterable.filterType = null;
        await table.sortAndFilter();
        expect(table.source).toEqual(data);

        expect(table.lastItem).toEqual({ position: 10, name: null, weight: 20.1797, symbol: 'Ne' });
    });

    it('should be unchecked state before ngOnChange', () => {
        table.source = deepClone(data);

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toEqual(true);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(false);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toEqual(false);
        expect(table.sourceExists).toEqual(true);
    });

    it('should be correct generate modelColumnKeys after ngOnChange', () => {
        table.source = deepClone(data);
        table.enableSelection = true;
        table.ngOnChanges(changes);
        table.ngOnInit();

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(true);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(false);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toEqual(false);
        expect(table.sourceExists).toEqual(true);
        expect(table.selection.primaryKey).toEqual('position');
    });

    it('should be correct state after ngAfterContentInit when source empty', () => {
        table.source = null;
        table.enableSelection = true;
        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toEqual(false);
        expect(table.sourceExists).toEqual(false);
    });

    it('should be correct state after ngAfterContentInit', fakeAsync(() => {
        table.source = deepClone(data);
        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toEqual(false);
        expect(table.sourceExists).toEqual(true);

        tick(600);

        expect(table.rendering).toEqual(false);
        expect(table.isRendered).toEqual(true);
        expect(table.positionColumns).toEqual(['position', 'name', 'weight', 'symbol']);

        tick(400);

        expect(table.rendering).toEqual(false);
        expect(table.isRendered).toEqual(true);
        expect(table.positionColumns).toEqual(['position', 'name', 'weight', 'symbol']);
    }));

    it('should be correct template changes', fakeAsync(() => {
        const templates: QueryList<NgxColumnComponent<PlainObject>> = new QueryList();

        table.columnTemplates = templates;
        table.source = [];

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toEqual(false);
        expect(table.sourceExists).toEqual(false);

        table.source = deepClone(data);
        templates.reset([new NgxColumnComponent()]);
        templates.notifyOnChanges();

        tick(1000);

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toEqual(true);
        expect(table.sourceExists).toEqual(true);

        tick(1000);

        expect(table.isRendered).toEqual(false);
        expect(table.afterViewInitDone).toEqual(true);
    }));

    it('should be correct template changes with check renderCount', fakeAsync(() => {
        const templates: QueryList<NgxColumnComponent<PlainObject>> = new QueryList();

        table.columnTemplates = templates;
        table.source = deepClone(data);

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();

        tick(600);

        expect(table.afterViewInitDone).toEqual(false);
        expect(table.isRendered).toEqual(true);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.contentCheck).toEqual(false);
        expect(table.sourceExists).toEqual(true);

        table.source = deepClone(data);
        templates.reset([new NgxColumnComponent()]);

        templates.notifyOnChanges();

        expect(table.isRendered).toEqual(true);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.contentCheck).toEqual(true);
        expect(table.sourceExists).toEqual(true);

        templates.reset([new NgxColumnComponent(), new NgxColumnComponent()]);
        templates.notifyOnChanges();
        table.ngAfterViewChecked();

        expect(table.afterViewInitDone).toEqual(false);

        tick(1000);

        expect(table.afterViewInitDone).toEqual(true);
    }));

    it('should be correct template changes query list', fakeAsync(() => {
        const templates: QueryList<NgxColumnComponent<PlainObject>> = new QueryList();

        table.columnTemplates = templates;
        table.source = [];

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();

        templates.reset([new NgxColumnComponent()]);
        templates.notifyOnChanges();

        table.source = deepClone(data);
        table.ngOnChanges(changes);

        tick(1000);

        expect(table.isRendered).toEqual(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toEqual(true);
        expect(table.sourceExists).toEqual(true);

        table.ngAfterViewChecked();

        tick(1000);

        expect(table.isRendered).toEqual(true);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toEqual(false);
        expect(table.rendering).toEqual(false);
        expect(table.contentInit).toEqual(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.contentCheck).toEqual(false);
        expect(table.sourceExists).toEqual(true);
    }));

    it('should be correct ngOnDestroy', () => {
        expect(table.destroy$.closed).toEqual(false);
        expect(table.destroy$.isStopped).toEqual(false);

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();
        table.ngOnDestroy();

        expect(table.destroy$.closed).toEqual(false);
        expect(table.destroy$.isStopped).toEqual(true);
    });

    it('should be correct sync rendering', fakeAsync(() => {
        table.source = deepClone(data);

        table.ngOnChanges(changes);
        table.renderTable();

        tick(1000);

        expect(table.positionColumns).toEqual(['position', 'name', 'weight', 'symbol']);
    }));
});
