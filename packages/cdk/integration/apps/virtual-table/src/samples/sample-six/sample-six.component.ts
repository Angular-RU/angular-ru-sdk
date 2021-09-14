import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Any, PlainObject } from '@angular-ru/cdk/typings';
import { OrderedField } from '@angular-ru/cdk/virtual-table';

import { MocksGenerator } from '../../../../../tests/jest/virtual-table/helpers/utils/mocks-generator';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';

declare const hljs: Any;

@Component({
    selector: 'sample-six',
    templateUrl: './sample-six.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSixComponent implements OnInit, AfterViewInit {
    public sortByIdDirection: boolean = true;
    public data: PlainObject[] = [];
    public skipSort: boolean = false;
    constructor(public readonly dialog: MatDialog, private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rows: number = 10000;
        const cols: number = 50;

        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }

    public sortChanges(event: OrderedField[]): void {
        // eslint-disable-next-line no-console
        console.log('orderedField', event);
    }

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview sortable table',
                description: '',
                code: `
<ngx-table-builder
    [source]="data"
    [skip-sort]="skipSort"
    [sort-types]="sortByIdDirection ? { id: 'asc' } : { id: 'desc' }"
    (sortChanges)="sortChanges($event)"
></ngx-table-builder>`
            },
            height: '350px',
            width: '700px'
        });
    }
}
