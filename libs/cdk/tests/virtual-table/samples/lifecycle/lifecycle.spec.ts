import {
    ApplicationRef,
    ChangeDetectorRef,
    ElementRef,
    NgZone,
    QueryList,
    SimpleChanges,
} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {deepClone} from '@angular-ru/cdk/object';
import {Fn, Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {
    NgxColumn,
    NgxTableViewChangesService,
    TableBuilder,
} from '@angular-ru/cdk/virtual-table';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

import {MapToTableEntriesPipe} from '../../../../virtual-table/pipes/map-to-table-entries.pipe';
import {TableSelectedItemsPipe} from '../../../../virtual-table/pipes/table-selected-items.pipe';
import {ContextMenuService} from '../../../../virtual-table/services/context-menu/context-menu.service';
import {DraggableService} from '../../../../virtual-table/services/draggable/draggable.service';
import {FilterableService} from '../../../../virtual-table/services/filterable/filterable.service';
import {ResizableService} from '../../../../virtual-table/services/resizer/resizable.service';
import {SelectionService} from '../../../../virtual-table/services/selection/selection.service';
import {SortableService} from '../../../../virtual-table/services/sortable/sortable.service';
import {TemplateParserService} from '../../../../virtual-table/services/template-parser/template-parser.service';

describe('[TEST]: Lifecycle table', () => {
    let table: TableBuilder<PlainObject>;
    let sortable: SortableService<PlainObject>;
    let draggable: DraggableService<PlainObject>;
    let resizeService: ResizableService;
    let changes: SimpleChanges;

    const mockChangeDetector: Partial<ChangeDetectorRef> = {
        detectChanges: (): void => {
            // ...
        },
    };

    const appRef: Partial<ApplicationRef> = {
        tick: (): void => {
            // ...
        },
    };
    const mockNgZone: Partial<NgZone> = {
        run: (callback: Fn): any => callback(),
        runOutsideAngular: (callback: Fn): any => callback(),
    };
    const webWorker: Partial<WebWorkerThreadService> = {
        async run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
            return Promise.resolve(workerFunction(data!));
        },
    };

    interface PeriodicElement {
        name: Nullable<string>;
        position: number;
        weight: number;
        symbol: string;
    }

    // noinspection DuplicatedCode
    const data: PeriodicElement[] = [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: null, weight: 15.9994, symbol: 'O'},
        {position: 9, name: null, weight: 18.9984, symbol: 'F'},
        {position: 10, name: null, weight: 20.1797, symbol: 'Ne'},
    ];

    beforeEach(() => {
        const worker: WebWorkerThreadService = webWorker as WebWorkerThreadService;
        const zone: NgZone = mockNgZone as NgZone;
        const app: ApplicationRef = appRef as ApplicationRef;
        const view: NgxTableViewChangesService = new NgxTableViewChangesService();

        const parser = new TemplateParserService<PlainObject>();

        draggable = new DraggableService(parser);

        resizeService = new ResizableService();

        // @ts-ignore
        sortable = new SortableService(worker, zone);

        table = new TableBuilder(mockChangeDetector as ChangeDetectorRef, {
            // eslint-disable-next-line complexity
            get(token: any): any {
                switch (token) {
                    case ApplicationRef:
                        return app;
                    case ContextMenuService:
                        return new ContextMenuService();
                    case DraggableService:
                        return draggable;
                    case FilterableService:
                        return new FilterableService({
                            get(_token: any): any {
                                // eslint-disable-next-line sonarjs/no-nested-switch
                                switch (_token) {
                                    case ApplicationRef:
                                        return app;
                                    case NgZone:
                                        return zone;
                                    case WebWorkerThreadService:
                                        return worker;
                                }
                            },
                        });
                    case NgxTableViewChangesService:
                        return view;
                    case NgZone:
                        return zone;
                    case ResizableService:
                        return resizeService;
                    case SelectionService:
                        return new SelectionService(zone);
                    case SortableService:
                        return sortable;
                    case TemplateParserService:
                        return parser;
                }
            },
        });

        const element: HTMLElement = document.createElement('div') as HTMLElement;

        Object.defineProperty(element, 'offsetHeight', {value: 900});

        table.scrollContainer = {nativeElement: element};
        table.primaryKey = 'position';
        changes = {};

        table.columnList = new QueryList<ElementRef<HTMLDivElement>>();
    });

    it('should be basic api', async () => {
        table.setSource(deepClone(data));

        expect(new TableSelectedItemsPipe(table).transform({1: true, 2: true})).toEqual([
            {position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079},
            {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        ]);

        // expect MapToTableEntriesPipe pipe works
        expect(new MapToTableEntriesPipe(table).transform([1, 2])).toEqual([
            {position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079},
            {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        ]);

        // expect MapToTableEntriesPipe pipe works with another ordering
        expect(new MapToTableEntriesPipe(table).transform([2, 1])).toEqual([
            {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
            {position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079},
        ]);

        // enable and check filter
        table.enableFiltering = true;
        table.filterable.filterValue = 'Hydrogen';
        table.filterable.filterType = 'START_WITH';
        await table.sortAndFilter();

        expect(table.source).toEqual([
            {name: 'Hydrogen', position: 1, symbol: 'H', weight: 1.0079},
        ]);

        // expect selection pipe works even with filtered values

        expect(new TableSelectedItemsPipe(table).transform({})).toEqual([]);

        expect(new TableSelectedItemsPipe(table).transform({1: true, 2: true})).toEqual([
            {position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079},
            {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        ]);

        expect(table.lastItem).toEqual({
            position: 1,
            name: 'Hydrogen',
            symbol: 'H',
            weight: 1.0079,
        });

        // reset filter
        table.enableFiltering = true;
        table.filterable.filterValue = null;
        table.filterable.filterType = null;
        await table.sortAndFilter();

        expect(table.source).toEqual(data);

        expect(table.lastItem).toEqual({
            position: 10,
            name: null,
            weight: 20.1797,
            symbol: 'Ne',
        });
    });

    it('should be unchecked state before ngOnChange', () => {
        table.source = deepClone(data);

        expect(table.isRendered).toBe(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toBe(true);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(false);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toBe(false);
        expect(table.sourceExists).toBe(true);
    });

    it('should be correct generate modelColumnKeys after ngOnChange', () => {
        table.source = deepClone(data);
        table.enableSelection = true;
        table.ngOnChanges(changes);
        table.ngOnInit();

        expect(table.isRendered).toBe(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toBe(true);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(false);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toBe(false);
        expect(table.sourceExists).toBe(true);
        expect(table.selection.primaryKey).toBe('position');
    });

    it('should be correct state after ngAfterContentInit when source empty', () => {
        table.source = null;
        table.enableSelection = true;
        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();

        expect(table.isRendered).toBe(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toBe(false);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toBe(false);
        expect(table.sourceExists).toBe(false);
    });

    it('should be correct state after ngAfterContentInit', fakeAsync(() => {
        table.source = deepClone(data);
        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();

        expect(table.isRendered).toBe(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toBe(false);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toBe(false);
        expect(table.sourceExists).toBe(true);

        tick(600);

        expect(table.rendering).toBe(false);
        expect(table.isRendered).toBe(true);
        expect(table.positionColumns).toEqual(['position', 'name', 'weight', 'symbol']);

        tick(400);

        expect(table.rendering).toBe(false);
        expect(table.isRendered).toBe(true);
        expect(table.positionColumns).toEqual(['position', 'name', 'weight', 'symbol']);
    }));

    it('should be correct template changes', fakeAsync(() => {
        const templates = new QueryList<NgxColumn<PlainObject>>();

        table.columnTemplates = templates;
        table.source = [];

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();

        expect(table.isRendered).toBe(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toBe(false);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toBe(false);
        expect(table.sourceExists).toBe(false);

        table.source = deepClone(data);
        templates.reset([new NgxColumn()]);
        templates.notifyOnChanges();

        tick(1000);

        expect(table.isRendered).toBe(false);
        expect(table.modelColumnKeys).toEqual([]);
        expect(table.dirty).toBe(false);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toBe(true);
        expect(table.sourceExists).toBe(true);

        tick(1000);

        expect(table.isRendered).toBe(false);
        expect(table.afterViewInitDone).toBe(true);
    }));

    it('should be correct template changes with check renderCount', fakeAsync(() => {
        const templates = new QueryList<NgxColumn<PlainObject>>();

        table.columnTemplates = templates;
        table.source = deepClone(data);

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();

        tick(600);

        expect(table.afterViewInitDone).toBe(false);
        expect(table.isRendered).toBe(true);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toBe(false);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.contentCheck).toBe(false);
        expect(table.sourceExists).toBe(true);

        table.source = deepClone(data);
        templates.reset([new NgxColumn()]);

        templates.notifyOnChanges();

        expect(table.isRendered).toBe(true);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toBe(false);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.contentCheck).toBe(true);
        expect(table.sourceExists).toBe(true);

        templates.reset([new NgxColumn(), new NgxColumn()]);
        templates.notifyOnChanges();
        table.ngAfterViewChecked();

        expect(table.afterViewInitDone).toBe(false);

        tick(1000);

        expect(table.afterViewInitDone).toBe(true);
    }));

    it('should be correct template changes query list', fakeAsync(() => {
        const templates = new QueryList<NgxColumn<PlainObject>>();

        table.columnTemplates = templates;
        table.source = [];

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();

        templates.reset([new NgxColumn()]);
        templates.notifyOnChanges();

        table.source = deepClone(data);
        table.ngOnChanges(changes);

        tick(1000);

        expect(table.isRendered).toBe(false);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toBe(false);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(true);
        expect(table.displayedColumns).toEqual([]);
        expect(table.contentCheck).toBe(true);
        expect(table.sourceExists).toBe(true);

        table.ngAfterViewChecked();

        tick(1000);

        expect(table.isRendered).toBe(true);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toBe(false);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.contentCheck).toBe(false);
        expect(table.sourceExists).toBe(true);
    }));

    it('should be correct ngOnDestroy', () => {
        expect(table.destroy$.closed).toBe(false);

        expect(table.destroy$.isStopped).toBe(false);

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();
        table.ngOnDestroy();

        expect(table.destroy$.closed).toBe(false);

        expect(table.destroy$.isStopped).toBe(true);
    });

    it('should be correct sync rendering', fakeAsync(() => {
        table.source = deepClone(data);

        table.ngOnChanges(changes);
        table.renderTable();

        tick(1000);

        expect(table.positionColumns).toEqual(['position', 'name', 'weight', 'symbol']);
    }));
});
