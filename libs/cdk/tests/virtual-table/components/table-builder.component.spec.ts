import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Nullable, PlainObject, SortOrderType } from '@angular-ru/cdk/typings';
import {
    TableBuilderComponent,
    TableBuilderModule,
    TableFilterType,
    TableSortTypes
} from '@angular-ru/cdk/virtual-table';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';

import { FilterDescriptor } from '../../../virtual-table/src/services/filterable/filter-descriptor';
import { MockWebWorkerService } from '../helpers/mock-web-worker.service';

@Component({
    selector: 'app-ngx-table-builder-mock',
    template: `
        <ngx-table-builder
            enable-selection
            enable-filtering
            [source]="data"
            [sort-types]="sortTypes"
            [filter-definition]="filterDefinition"
        ></ngx-table-builder>
    `
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

describe('[TEST] Table builder', (): void => {
    let componentFixture: ComponentFixture<NgxTableBuilderMockComponent>;
    let component: NgxTableBuilderMockComponent;
    let idleResolveMock: jest.SpyInstance;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [TableBuilderModule, NoopAnimationsModule],
            declarations: [NgxTableBuilderMockComponent],
            providers: [
                {
                    provide: WebWorkerThreadService,
                    useClass: MockWebWorkerService
                },
                {
                    provide: MATERIAL_SANITY_CHECKS,
                    useValue: false
                }
            ]
        }).compileComponents();

        const someSortableService = TestBed.createComponent(TableBuilderComponent).componentInstance.sortable;

        idleResolveMock = jest
            .spyOn(someSortableService.constructor.prototype, 'idleResolve')
            .mockImplementation((resolve: any, sorted: unknown) => resolve(sorted));

        componentFixture = TestBed.createComponent(NgxTableBuilderMockComponent);
        component = componentFixture.componentInstance;
        componentFixture.autoDetectChanges();
    });

    afterAll((): void => {
        idleResolveMock.mockRestore();
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
            { value: 'iv, sidor', type: TableFilterType.CONTAINS_ONE_OF_VALUES, key: 'lastName' }
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

        tableBuilderComponent.filterable.setDefinition([{ value: 3, type: TableFilterType.DOES_NOT_EQUAL, key: 'id' }]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 4, name: null, lastName: null }
        ]);

        tableBuilderComponent.filterable.setDefinition([{ value: 3, type: TableFilterType.EQUALS, key: 'id' }]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([{ id: 3, name: 'Petr', lastName: 'Sidorov' }]);

        tableBuilderComponent.filterable.setDefinition([{ value: true, type: TableFilterType.IS_FILLED, key: 'name' }]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' }
        ]);

        tableBuilderComponent.filterable.setDefinition([
            { value: false, type: TableFilterType.IS_FILLED, key: 'name' }
        ]);
        await tableBuilderComponent.sortAndFilter();

        expect(tableBuilderComponent.source).toEqual([{ id: 4, name: null, lastName: null }]);

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
        tableBuilderComponent.filterable.updateFilterTypeBy(TableFilterType.LESS_OR_EQUAL, 'id');
        tableBuilderComponent.filterable.updateFilterValueBy('2', 'id');
        componentFixture.detectChanges();
        /**
         * Caretaker note:
         * since the filtering happens several times and outside the zone,
         * there is no way to catch the moment when the filtering is completed using `whenStable`
         */
        // eslint-disable-next-line no-restricted-globals
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' }
        ]);
    });

    it('should not filter table', async (): Promise<void> => {
        const tableBuilderComponent: TableBuilderComponent<PlainObject> = component.tableBuilderComponent;

        tableBuilderComponent.enableFiltering = false;

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 4, name: null, lastName: null }
        ]);
        // default type - TableFilterType.CONTAINS
        tableBuilderComponent.filterable.updateFilterValueBy('rov', 'lastName');
        componentFixture.detectChanges();
        /**
         * Caretaker note:
         * since the filtering happens several times and outside the zone,
         * there is no way to catch the moment when the filtering is completed using `whenStable`
         */
        // eslint-disable-next-line no-restricted-globals
        await new Promise((resolve) => setTimeout(resolve, 1000));

        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 4, name: null, lastName: null }
        ]);
    });
});
