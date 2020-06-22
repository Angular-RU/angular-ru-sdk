/* eslint-disable */
import { NgxColumnComponent, NgxTableViewChangesService, TableBuilderComponent } from '@angular-ru/ng-table-builder';
import { ApplicationRef, ChangeDetectorRef, ElementRef, NgZone, QueryList, SimpleChanges } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { Any, Fn } from '../../../../src/interfaces/table-builder.internal';
import { ContextMenuService } from '../../../../src/services/context-menu/context-menu.service';
import { DraggableService } from '../../../../src/services/draggable/draggable.service';
import { FilterableService } from '../../../../src/services/filterable/filterable.service';
import { ResizableService } from '../../../../src/services/resizer/resizable.service';
import { SelectionService } from '../../../../src/services/selection/selection.service';
import { SortableService } from '../../../../src/services/sortable/sortable.service';
import { TemplateParserService } from '../../../../src/services/template-parser/template-parser.service';
import { UtilsService } from '../../../../src/services/utils/utils.service';
import { WebWorkerThreadService } from '../../../../src/worker/worker-thread.service';

describe('[TEST]: Lifecycle table', () => {
    let table: TableBuilderComponent;
    let sortable: SortableService;
    let utils: UtilsService;
    let draggable: DraggableService;
    let resizeService: ResizableService;
    let changes: SimpleChanges;

    const mockChangeDetector: Partial<ChangeDetectorRef> = {
        detectChanges: (): void => {}
    };
    const appRef: Partial<ApplicationRef> = {
        tick: (): void => {}
    };
    const mockNgZone: Partial<NgZone> = {
        run: (callback: Fn): Any => callback(),
        runOutsideAngular: (callback: Fn): Any => callback()
    };

    interface PeriodicElement {
        name: string;
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
        { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
        { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
        { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
    ];

    beforeEach(() => {
        const worker: WebWorkerThreadService = new WebWorkerThreadService();
        const zone: NgZone = mockNgZone as NgZone;
        const app: ApplicationRef = appRef as ApplicationRef;
        const view: NgxTableViewChangesService = new NgxTableViewChangesService();
        utils = new UtilsService(zone);

        const parser: TemplateParserService = new TemplateParserService();
        draggable = new DraggableService(parser);

        resizeService = new ResizableService();
        sortable = new SortableService(worker, zone);

        table = new TableBuilderComponent(mockChangeDetector as ChangeDetectorRef, {
            get(token: Any): Any {
                switch (token) {
                    case SelectionService:
                        return new SelectionService(zone);
                    case TemplateParserService:
                        return parser;
                    case NgZone:
                        return zone;
                    case UtilsService:
                        return utils;
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
                            get(token: Any): Any {
                                switch (token) {
                                    case ApplicationRef:
                                        return app;
                                    case WebWorkerThreadService:
                                        return worker;
                                    case UtilsService:
                                        return utils;
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
            } as any
        };

        table.primaryKey = 'position';
        changes = {};

        table.columnList = new QueryList<ElementRef<HTMLDivElement>>();
    });

    it('should be basic api', () => {
        table.source = JSON.parse(JSON.stringify(data));
        expect(table.selectedItems).toEqual([]);
        expect(table.lastItem).toEqual({ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' });
    });

    it('should be unchecked state before ngOnChange', () => {
        table.source = JSON.parse(JSON.stringify(data));

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
        table.source = JSON.parse(JSON.stringify(data));
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
        table.source = JSON.parse(JSON.stringify(data));
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
        const templates: QueryList<NgxColumnComponent> = new QueryList();
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

        table.source = JSON.parse(JSON.stringify(data));
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
        const templates: QueryList<NgxColumnComponent> = new QueryList();
        table.columnTemplates = templates;
        table.source = JSON.parse(JSON.stringify(data));

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

        table.source = JSON.parse(JSON.stringify(data));
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
        const templates: QueryList<NgxColumnComponent> = new QueryList();
        table.columnTemplates = templates;
        table.source = [];

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();

        templates.reset([new NgxColumnComponent()]);
        templates.notifyOnChanges();

        table.source = JSON.parse(JSON.stringify(data));
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
        expect(table['destroy$'].closed).toEqual(false);

        table.ngOnChanges(changes);
        table.ngOnInit();
        table.ngAfterContentInit();
        table.ngAfterViewInit();
        table.ngAfterViewChecked();
        table.ngOnDestroy();

        expect(table['destroy$'].closed).toEqual(true);
    });

    it('should be correct sync rendering', fakeAsync(() => {
        table.source = JSON.parse(JSON.stringify(data));

        table.ngOnChanges(changes);
        table.renderTable();

        tick(1000);

        expect(table.positionColumns).toEqual(['position', 'name', 'weight', 'symbol']);
    }));
});
