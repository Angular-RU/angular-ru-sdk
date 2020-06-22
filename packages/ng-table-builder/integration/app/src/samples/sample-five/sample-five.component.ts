import { SimpleSchemaColumns, TableRow } from '@angular-ru/ng-table-builder';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Any } from '../../../../../src/interfaces/table-builder.internal';
import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';

declare const hljs: Any;

@Component({
    selector: 'sample-five',
    templateUrl: './sample-five.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFiveComponent implements OnInit, AfterViewInit {
    public data: TableRow[] = [];
    constructor(public readonly dialog: MatDialog, private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rows: number = 1000;
        const cols: number = 40;
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

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview resizable table',
                description: '',
                code: `
<ngx-table-builder [source]="data">
    <!--
       <ngx-options /> - declaration common options for columns

       Also you can customize your columns manually
       <ngx-column key="myKey" [resizable]="true">...</ngx-column>
    -->
    <ngx-options is-draggable></ngx-options>
</ngx-table-builder>

                `
            },
            height: '350px',
            width: '700px'
        });
    }

    public updatedSchema(event: SimpleSchemaColumns): void {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
