import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-third',
    templateUrl: './sample-third.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleThirdComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];

    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
    ) {}

    public ngOnInit(): void {
        const rowNumber = 1000;
        const colsNumber = 59;

        MocksGenerator.generator(rowNumber, colsNumber).then(
            (data: PlainObject[]): void => {
                this.data = data;
                this.cd.detectChanges();
            },
        );
    }

    public disableFn(item: Nullable<PlainObject>): boolean {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return ((item as any)?.id ?? 0) % 5 === 0;
    }

    public ngAfterViewInit(): void {
        hlJsCode();
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
                    `,
            },
            height: '650px',
            width: '900px',
        });
    }
}
