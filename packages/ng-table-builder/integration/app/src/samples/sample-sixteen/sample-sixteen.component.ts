import {
    NgxTableViewChangesService,
    SimpleSchemaColumns,
    TableRow,
    TableUpdateSchema
} from '@angular-ru/ng-table-builder';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { Any } from '../../../../../src/interfaces/table-builder.internal';
import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-sixteen',
    templateUrl: './sample-sixteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSixteenComponent implements OnInit, AfterViewInit, OnDestroy {
    public data: TableRow[] = [];
    public schema: SimpleSchemaColumns | null = null;
    public readonly testName: string = 'test';
    private sub: Subscription | null = null;

    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
        private readonly tableChanges: NgxTableViewChangesService
    ) {}

    public ngOnInit(): void {
        const schema: TableUpdateSchema = JSON.parse(
            window.localStorage.getItem(this.testName) ?? '{}'
        ) as TableUpdateSchema;

        this.schema = (schema && schema.columns) || [];

        const rowNumber: number = 1000;
        const colsNumber: number = 59;

        MocksGenerator.generator(rowNumber, colsNumber).then((data: TableRow[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });

        this.sub = this.tableChanges.events.subscribe((event: TableUpdateSchema): void => this.save(event));
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }

    public ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    private save(event: TableUpdateSchema): void {
        // eslint-disable-next-line no-console
        console.log(event); // NOSONAR
        window.localStorage.setItem(this.testName, JSON.stringify(event));
        this.schema = [...event.columns];
        this.cd.detectChanges();
    }
}
