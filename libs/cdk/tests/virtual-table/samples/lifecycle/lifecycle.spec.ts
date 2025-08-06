import {ChangeDetectorRef, ElementRef, QueryList, SimpleChanges} from '@angular/core';
import {SIGNAL} from '@angular/core/primitives/signals';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {deepClone} from '@angular-ru/cdk/object';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {
    FilterableService,
    NgxColumn,
    NgxTableViewChangesService,
    SelectionService,
    TableBuilder,
} from '@angular-ru/cdk/virtual-table';
import {ContextMenuService} from '@angular-ru/cdk/virtual-table/services/context-menu/context-menu.service';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

import {MapToTableEntriesPipe} from '../../../../virtual-table/pipes/map-to-table-entries.pipe';
import {DraggableService} from '../../../../virtual-table/services/draggable/draggable.service';
import {ResizableService} from '../../../../virtual-table/services/resizer/resizable.service';
import {SortableService} from '../../../../virtual-table/services/sortable/sortable.service';
import {TemplateParserService} from '../../../../virtual-table/services/template-parser/template-parser.service';

describe('[TEST]: Lifecycle table', () => {
    let table: TableBuilder<PlainObject>;
    let changes: SimpleChanges;

    const mockChangeDetector: Partial<ChangeDetectorRef> = {
        detectChanges: (): void => {
            // ...
        },
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

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: WebWorkerThreadService,
                    useValue: worker,
                },
                {
                    provide: ChangeDetectorRef,
                    useValue: mockChangeDetector,
                },
                provideNoopAnimations(),
                MapToTableEntriesPipe,
                ContextMenuService,
                DraggableService,
                FilterableService,
                NgxTableViewChangesService,
                ResizableService,
                SelectionService,
                SortableService,
                TemplateParserService,
                TableBuilder,
            ],
        });

        table = TestBed.inject(TableBuilder);

        const element: HTMLElement = document.createElement('div') as HTMLElement;

        Object.defineProperty(element, 'offsetHeight', {value: 900});

        table.scrollContainer = {nativeElement: element};
        table.primaryKey[SIGNAL].value = 'position';
        changes = {};

        table.columnList = new QueryList<ElementRef<HTMLDivElement>>();
    });

    it('should be basic api', async () => {
        table.setSource(deepClone(data));

        const mapToTableEntriesPipe = TestBed.inject(MapToTableEntriesPipe);

        // expect MapToTableEntriesPipe pipe works
        expect(mapToTableEntriesPipe.transform([1, 2])).toEqual([
            {position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079},
            {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        ]);

        // expect MapToTableEntriesPipe pipe works with another ordering
        expect(mapToTableEntriesPipe.transform([2, 1])).toEqual([
            {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
            {position: 1, name: 'Hydrogen', symbol: 'H', weight: 1.0079},
        ]);

        // enable and check filter
        table.enableFiltering[SIGNAL].value = true;
        table.filterable.filterValue = 'Hydrogen';
        table.filterable.filterType = 'START_WITH';
        await table.sortAndFilter();

        expect(table.source()).toEqual([
            {name: 'Hydrogen', position: 1, symbol: 'H', weight: 1.0079},
        ]);

        expect(table.lastItem).toEqual({
            position: 1,
            name: 'Hydrogen',
            symbol: 'H',
            weight: 1.0079,
        });

        // reset filter
        table.enableFiltering[SIGNAL].value = true;
        table.filterable.filterValue = null;
        table.filterable.filterType = null;
        await table.sortAndFilter();

        expect(table.source()).toEqual(data);

        expect(table.lastItem).toEqual({
            position: 10,
            name: null,
            weight: 20.1797,
            symbol: 'Ne',
        });
    });

    it('should be unchecked state before ngOnChange', () => {
        table.source[SIGNAL].value = deepClone(data);

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
        table.source[SIGNAL].value = deepClone(data);
        table.enableSelection[SIGNAL].value = true;
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
        table.source[SIGNAL].value = null;
        table.enableSelection[SIGNAL].value = true;
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
        table.source[SIGNAL].value = deepClone(data);
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
        table.source[SIGNAL].value = [];

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

        table.source[SIGNAL].value = deepClone(data);
        const column = TestBed.runInInjectionContext(() => new NgxColumn());

        templates.reset([column]);
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
        table.source[SIGNAL].value = deepClone(data);

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

        table.source[SIGNAL].value = deepClone(data);
        const column = TestBed.runInInjectionContext(() => new NgxColumn());

        templates.reset([column]);

        templates.notifyOnChanges();

        expect(table.isRendered).toBe(true);
        expect(table.modelColumnKeys).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.dirty).toBe(false);
        expect(table.rendering).toBe(false);
        expect(table.contentInit).toBe(true);
        expect(table.displayedColumns).toEqual(['position', 'name', 'weight', 'symbol']);
        expect(table.contentCheck).toBe(true);
        expect(table.sourceExists).toBe(true);

        const column1 = TestBed.runInInjectionContext(() => new NgxColumn());
        const column2 = TestBed.runInInjectionContext(() => new NgxColumn());

        templates.reset([column1, column2]);
        templates.notifyOnChanges();
        table.ngAfterViewChecked();

        expect(table.afterViewInitDone).toBe(false);

        tick(1000);

        expect(table.afterViewInitDone).toBe(true);
    }));

    it('should be correct template changes query list', fakeAsync(() => {
        const templates = new QueryList<NgxColumn<PlainObject>>();

        table.columnTemplates = templates;
        table.source[SIGNAL].value = [];

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();

        const column = TestBed.runInInjectionContext(() => new NgxColumn());

        templates.reset([column]);
        templates.notifyOnChanges();

        table.source[SIGNAL].value = deepClone(data);
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
        table.source[SIGNAL].value = deepClone(data);

        table.ngOnChanges(changes);
        table.renderTable();

        tick(1000);

        expect(table.positionColumns).toEqual(['position', 'name', 'weight', 'symbol']);
    }));
});
