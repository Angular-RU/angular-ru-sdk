import { Component, Injectable, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';
import { TableBuilderComponent, TableBuilderModule, TableSortTypes } from '@angular-ru/ng-table-builder';
import { PlainObject, SortOrderType } from '@angular-ru/common/typings';
import { deepClone } from '@angular-ru/common/object';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'app-ngx-table-builder-mock',
    template: ` <ngx-table-builder enable-selection [source]="data" [sort-types]="sortTypes"></ngx-table-builder>`
})
class NgxTableBuilderMockComponent {
    @ViewChild(TableBuilderComponent, { static: true })
    public tableBuilderComponent!: TableBuilderComponent<PlainObject>;

    public data: PlainObject[] = [
        { id: 1, name: 'Max', lastName: 'Ivanov' },
        { id: 2, name: 'Ivan', lastName: 'Petrov' },
        { id: 3, name: 'Petr', lastName: 'Sidorov' }
    ];

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

    beforeAll((): void => {
        TestBed.configureTestingModule({
            imports: [TableBuilderModule]
        }).compileComponents();
        const someSortableService = TestBed.createComponent(TableBuilderComponent).componentInstance.sortable;
        someSortableService.constructor.prototype.idleResolve = jest.fn(function idleResolve<T>(
            resolve: (value: T[]) => void,
            sorted: T[]
        ): void {
            resolve(sorted);
        });
    });

    beforeEach((): void => {
        TestBed.configureTestingModule({
            declarations: [NgxTableBuilderMockComponent],
            imports: [TableBuilderModule, NoopAnimationsModule],
            providers: [
                {
                    provide: WebWorkerThreadService,
                    useClass: MockWebWorkerThreadService
                }
            ]
        }).compileComponents();
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
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 1, name: 'Max', lastName: 'Ivanov' }
        ]);

        component.sortTypes = { name: SortOrderType.ASC };
        componentFixture.detectChanges();
        await componentFixture.whenStable();
        expect(tableBuilderComponent.source).toEqual([
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
            { id: 3, name: 'Petr', lastName: 'Sidorov' }
        ]);

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![0], mockClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 1: true });

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![1], mockShiftClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 1: true, 2: true });

        component.sortTypes = { name: SortOrderType.DESC };
        componentFixture.detectChanges();
        await componentFixture.whenStable();
        expect(tableBuilderComponent.source).toEqual([
            { id: 3, name: 'Petr', lastName: 'Sidorov' },
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' }
        ]);

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![0], mockClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 3: true });

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![1], mockShiftClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 3: true, 1: true });

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![2], mockShiftClientEvent);
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 3: true, 1: true, 2: true });
    });
});
