import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PlainObject } from '@angular-ru/cdk/typings';
import { TableBuilderComponent, TableBuilderModule } from '@angular-ru/cdk/virtual-table';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';

import { MockWebWorkerService } from '../helpers/mock-web-worker.service';

@Component({
    selector: 'selection-mock',
    template: ` <ngx-table-builder enable-selection [source]="data"></ngx-table-builder>`
})
class SelectionMockComponent {
    @ViewChild(TableBuilderComponent, { static: true })
    public tableBuilderComponent!: TableBuilderComponent<PlainObject>;

    public data: PlainObject[] = [
        { id: 1, name: 'Max', lastName: 'Ivanov' },
        { id: 2, name: 'Ivan', lastName: 'Petrov' },
        { id: 3, name: 'Petr', lastName: 'Sidorov' }
    ];
}

describe('[TEST] Table builder', (): void => {
    let componentFixture: ComponentFixture<SelectionMockComponent>;
    let component: SelectionMockComponent;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            declarations: [SelectionMockComponent],
            imports: [TableBuilderModule, NoopAnimationsModule],
            providers: [
                { provide: WebWorkerThreadService, useClass: MockWebWorkerService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ]
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
        componentFixture = TestBed.createComponent(SelectionMockComponent);
        component = componentFixture.componentInstance;
    });

    it('should be correct select items from 1..2 by shift key', async () => {
        const tableBuilderComponent: TableBuilderComponent<PlainObject> = component.tableBuilderComponent;
        expect(tableBuilderComponent.source).toEqual(null);

        componentFixture.detectChanges();
        expect(tableBuilderComponent.source).toEqual([
            { id: 1, name: 'Max', lastName: 'Ivanov' },
            { id: 2, name: 'Ivan', lastName: 'Petrov' },
            { id: 3, name: 'Petr', lastName: 'Sidorov' }
        ]);

        tableBuilderComponent.selection.selectRow(tableBuilderComponent.source![0], new MouseEvent('click'));
        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 1: true });

        tableBuilderComponent.selection.selectRow(
            tableBuilderComponent.source![1],
            new MouseEvent('click', { shiftKey: true })
        );

        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({ 1: true, 2: true });
    });

    afterAll((): void => {
        const someSortableService = TestBed.createComponent(TableBuilderComponent).componentInstance.sortable;
        someSortableService.constructor.prototype.idleResolve.mockRestore();
    });
});
