import { Component, Injectable, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { deepClone } from '@angular-ru/cdk/object';
import { Any, Nullable, PlainObject, SortOrderType } from '@angular-ru/cdk/typings';
import {
    TableBuilderComponent,
    TableBuilderModule,
    TableFilterType,
    TableSortTypes
} from '@angular-ru/cdk/virtual-table';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';

import { FilterDescriptor } from '../../../../../virtual-table/src/services/filterable/filter-descriptor';

@Component({
    selector: 'app-ngx-table-builder-mock',
    template: ` <ngx-table-builder
        enable-selection
        enable-filtering
        [source]="data"
        [sort-types]="sortTypes"
        [filter-definition]="filterDefinition"
    ></ngx-table-builder>`
})
class NgxTableBuilderMockComponent {
    @ViewChild(TableBuilderComponent, { static: true })
    public tableBuilderComponent!: TableBuilderComponent<PlainObject>;

    public data: PlainObject[] = [
        { id: 1, name: 'Max', lastName: 'Ivanov' },
        { id: 2, name: 'Ivan', lastName: 'Petrov' },
        { id: 3, name: 'Petr', lastName: 'Sidorov' },
        { id: 4, name: null, lastName: null }
    ];

    public filterDefinition: Nullable<FilterDescriptor[]> = null;

    public sortTypes: TableSortTypes = null;
}

@Injectable()
class MockWebWorkerThreadService {
    public run<T, K>(workerFunction: (input?: K) => T, data?: K): Promise<T> {
        return Promise.resolve(workerFunction(deepClone(data)!));
    }
}

describe('[TEST] Table builder', (): void => {
    let componentFixture: ComponentFixture<NgxTableBuilderMockComponent>;
    let component: NgxTableBuilderMockComponent;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            declarations: [NgxTableBuilderMockComponent],
            imports: [TableBuilderModule, NoopAnimationsModule],
            providers: [
                {
                    provide: WebWorkerThreadService,
                    useClass: MockWebWorkerThreadService
                },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
        }).compileComponents();

        const someSortableService = TestBed.createComponent(TableBuilderComponent).componentInstance.sortable;
        jest.spyOn(someSortableService.constructor.prototype, 'idleResolve').mockImplementation(
            (resolve: Any, sorted: unknown) => resolve(sorted)
        );
    });

    afterAll((): void => {
        const someSortableService = TestBed.createComponent(TableBuilderComponent).componentInstance.sortable;
        someSortableService.constructor.prototype.idleResolve.mockRestore();
    });

    beforeEach((): void => {
        componentFixture = TestBed.createComponent(NgxTableBuilderMockComponent);
        component = componentFixture.componentInstance;
        componentFixture.autoDetectChanges();
    });

    it('should correct sort by input', async (): Promise<void> => {
        const tableBuilderComponent: TableBuilderComponent<PlainObject> = component.tableBuilderComponent;

        component.sortTypes = { id: 'desc' };
        componentFixture.detectChanges();

        await componentFixture.whenStable();
        expect(tableBuilderComponent.source).toEqual([
            { id: 4, name: null, lastName: null },
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 1, name: 'Max', lastName: 'Ivanov' }
        ]);

        // eslint-disable-next-line require-atomic-updates
        component.sortTypes = { name: SortOrderType.ASC };
        componentFixture.detectChanges();
        await componentFixture.whenStable();
        expect(tableBuilderComponent.source).toEqual([
            { id: 4, name: null, lastName: null },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' }
        ]);
    });

    it('should correct select after sort', async (): Promise<void> => {
        const mockClientEvent = new MouseEvent('click');
        const mockShiftClientEvent = new MouseEvent('click', { shiftKey: true });
        const tableBuilderComponent: TableBuilderComponent<PlainObject> = component.tableBuilderComponent;

        componentFixture.detectChanges();
        await componentFixture.whenStable();
        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 4, name: null, lastName: null }
        ]);

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![0], mockClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 1: true });

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![1], mockShiftClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 1: true, 2: true });

        // eslint-disable-next-line require-atomic-updates
        component.sortTypes = { name: SortOrderType.DESC };
        componentFixture.detectChanges();
        await componentFixture.whenStable();
        expect(tableBuilderComponent.source).toEqual([
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 4, name: null, lastName: null }
        ]);

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![0], mockClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 3: true });

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![1], mockShiftClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 3: true, 1: true });

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![2], mockShiftClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 3: true, 1: true, 2: true });
    });

    it('should correctly filter table', async (): Promise<void> => {
        const tableBuilderComponent: TableBuilderComponent<PlainObject> = component.tableBuilderComponent;

        tableBuilderComponent.filterable.setDefinition([
            { value: 'Si', type: TableFilterType.START_WITH, key: 'lastName' }
        ]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([{ id: 3, name: 'Petr', lastName: 'Sidorov' }]);

        tableBuilderComponent.filterable.setDefinition([
            { value: 'rov', type: TableFilterType.END_WITH, key: 'lastName' }
        ]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' }
        ]);

        tableBuilderComponent.filterable.setDefinition([
            { value: 'i', type: TableFilterType.CONTAINS, key: 'lastName' }
        ]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' }
        ]);

        tableBuilderComponent.filterable.setDefinition([
            { value: 'i', type: TableFilterType.DOES_NOT_CONTAIN, key: 'lastName' }
        ]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 4, lastName: null, name: null }
        ]);

        tableBuilderComponent.filterable.setDefinition([
            { value: 'ivanov', type: TableFilterType.EQUALS, key: 'lastName' }
        ]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([{ id: 1, name: 'Max', lastName: 'Ivanov' }]);

        tableBuilderComponent.filterable.setDefinition([
            { value: 'petrov', type: TableFilterType.DOES_NOT_EQUAL, key: 'lastName' }
        ]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 4, lastName: null, name: null }
        ]);

        tableBuilderComponent.filterable.setDefinition([{ value: 2, type: TableFilterType.MORE_THAN, key: 'id' }]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 4, lastName: null, name: null }
        ]);

        tableBuilderComponent.filterable.setDefinition([{ value: 2, type: TableFilterType.MORE_OR_EQUAL, key: 'id' }]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 4, lastName: null, name: null }
        ]);

        tableBuilderComponent.filterable.setDefinition([{ value: 2, type: TableFilterType.LESS_THAN, key: 'id' }]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([{ id: 1, name: 'Max', lastName: 'Ivanov' }]);

        tableBuilderComponent.filterable.setDefinition([{ value: 2, type: TableFilterType.LESS_OR_EQUAL, key: 'id' }]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' }
        ]);
    });

    it('should correctly filter table by input', async (): Promise<void> => {
        const tableBuilderComponent: TableBuilderComponent<PlainObject> = component.tableBuilderComponent;

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 4, name: null, lastName: null }
        ]);

        component.filterDefinition = [{ value: 2, type: TableFilterType.LESS_OR_EQUAL, key: 'id' }];
        componentFixture.detectChanges();
        /**
         * Caretaker note:
         * since the filtering happens several times and outside the zone,
         * there is no way to catch the moment when the filtering is completed using `whenStable`
         */
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' }
        ]);
    });
});
