import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Any, Nullable, PlainObject } from '@angular-ru/cdk/typings';
import { NgxTableViewChangesService, TableUpdateSchema } from '@angular-ru/cdk/virtual-table';
import { Subscription } from 'rxjs';

import { MocksGenerator } from '../../../../../../tests/virtual-table/helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-sixteen',
    templateUrl: './sample-sixteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSixteenComponent implements OnInit, AfterViewInit, OnDestroy {
    private sub: Nullable<Subscription> = null;
    public data: PlainObject[] = [];
    public schema: Nullable<TableUpdateSchema> = null;
    public readonly testName: string = 'test';

    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
        private readonly tableChanges: NgxTableViewChangesService
    ) {}

    public ngOnInit(): void {
        this.schema = JSON.parse(window.localStorage.getItem(this.testName) ?? '{}') as TableUpdateSchema;
        const rowNumber: number = 3;
        const colsNumber: number = 10;

        MocksGenerator.generator(rowNumber, colsNumber).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });

        this.sub = this.tableChanges.events$.subscribe((event: TableUpdateSchema): void => this.save(event));
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
        console.log('update schema', event);
        window.localStorage.setItem(this.testName, JSON.stringify(event));
    }
}
