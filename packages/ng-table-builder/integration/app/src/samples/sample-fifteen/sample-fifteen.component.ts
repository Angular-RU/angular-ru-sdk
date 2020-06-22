import { SimpleSchemaColumns, TableRow } from '@angular-ru/ng-table-builder';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Any } from '../../../../../src/interfaces/table-builder.internal';
import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-fifteen',
    templateUrl: './sample-fifteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFifteenComponent implements OnInit, AfterViewInit {
    public data: TableRow[] = [];
    constructor(public readonly dialog: MatDialog, private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rows: number = 10000;
        const cols: number = 59;
        MocksGenerator.generator(rows, cols).then((data: TableRow[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }

    public updatedSchema(event: SimpleSchemaColumns): void {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
