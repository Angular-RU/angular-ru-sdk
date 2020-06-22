import { TableBuilderComponent, TableRow } from '@angular-ru/ng-table-builder';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Any } from '../../../../../src/interfaces/table-builder.internal';
import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';

declare const hljs: Any;

// noinspection CssUnusedSymbol
@Component({
    selector: 'sample-fourteen',
    templateUrl: './sample-fourteen.component.html',
    styles: [
        // tslint:disable-next-line:component-max-inline-declarations
        `
            .filter-example .table-grid__column {
                text-transform: uppercase;
            }

            .filter-example .table-grid__cell > * {
                font-size: 12px;
            }

            .filter-example .table-grid__header-cell {
                min-height: 50px;
                max-height: 50px;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFourteenComponent implements OnInit, AfterViewInit {
    @ViewChild('table', { static: false })
    public table!: TableBuilderComponent;

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

    public clearFilter(): void {
        this.table.filterable.reset();
    }

    // eslint-disable-next-line max-lines-per-function
    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview selection table',
                description:
                    'In order to use the API for string highlighting, you can use the table.selection service. <br>' +
                    'In more detail you can read in the guide.',
                code: `
<ngx-table-builder #table [source]="data" enable-selection>
    <ngx-column key="selection" sticky width="55" custom-key>
        <ng-template ngx-th>
            <mat-checkbox
                (change)="table.selection.toggleAll(data)"
                [indeterminate]="table.selectionModel.isIndeterminate"
                [checked]="table.selectionModel.isAll"
            ></mat-checkbox>
        </ng-template>
        <ng-template ngx-td row let-row (onClick)="$event.preventDefault()">
            <mat-checkbox
                [checked]="table.selectionModel.get($any(row).id)"
                (change)="table.selection.toggle(row)"
            ></mat-checkbox>
        </ng-template>
    </ngx-column>

    <ngx-column *ngFor="let key of table.modelColumnKeys" [key]="key">
       <!--
        If you want to parameterize your templates, you can describe the code here.
        <ng-template ngx-th>{{ key }}</ng-template>
        <ng-template ngx-td let-cell>{{ cell }}</ng-template>
       -->
    </ngx-column>
</ngx-table-builder>
                    `
            },
            height: '650px',
            width: '900px'
        });
    }
}
