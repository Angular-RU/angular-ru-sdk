import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PlainObject} from '@angular-ru/cdk/typings';
import {TableBuilder, VirtualTable} from '@angular-ru/cdk/virtual-table';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

import {MockWebWorkerService} from '../helpers/mock-web-worker.service';

@Component({
    selector: 'selection-mock',
    imports: [VirtualTable],
    template: `
        <ngx-table-builder
            enable-selection
            [source]="data"
        ></ngx-table-builder>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class SelectionMockComponent {
    @ViewChild(TableBuilder, {static: true})
    public tableBuilderComponent!: TableBuilder<PlainObject>;

    public data: PlainObject[] = [
        {id: 1, name: 'Max', lastName: 'Ivanov'},
        {id: 2, name: 'Ivan', lastName: 'Petrov'},
        {id: 3, name: 'Petr', lastName: 'Sidorov'},
    ];
}

describe('[TEST] Table builder', (): void => {
    let componentFixture: ComponentFixture<SelectionMockComponent>;
    let component: SelectionMockComponent;
    let idleResolve: jest.SpyInstance;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [SelectionMockComponent, NoopAnimationsModule],
            providers: [
                {provide: WebWorkerThreadService, useClass: MockWebWorkerService},
            ],
        }).compileComponents();

        const someSortableService =
            TestBed.createComponent(TableBuilder).componentInstance.sortable;

        idleResolve = jest
            .spyOn(someSortableService.constructor.prototype, 'idleResolve')
            .mockImplementation((resolve: any, sorted: unknown) => resolve(sorted));

        componentFixture = TestBed.createComponent(SelectionMockComponent);
        component = componentFixture.componentInstance;
    });

    afterAll((): void => {
        idleResolve.mockRestore();
    });

    it('should be correct select items from 1..2 by shift key', async () => {
        const tableBuilderComponent: TableBuilder<PlainObject> =
            component.tableBuilderComponent;

        expect(tableBuilderComponent.source).toBeNull();

        componentFixture.detectChanges();

        expect(tableBuilderComponent.source).toEqual([
            {id: 1, name: 'Max', lastName: 'Ivanov'},
            {id: 2, name: 'Ivan', lastName: 'Petrov'},
            {id: 3, name: 'Petr', lastName: 'Sidorov'},
        ]);

        tableBuilderComponent.selection.selectRow(
            tableBuilderComponent.source![0],
            new MouseEvent('click'),
        );

        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({1: true});

        tableBuilderComponent.selection.selectRow(
            tableBuilderComponent.source![1],
            new MouseEvent('click', {shiftKey: true}),
        );

        expect(tableBuilderComponent.selection.selectionModel.entries).toEqual({
            1: true,
            2: true,
        });
    });
});
