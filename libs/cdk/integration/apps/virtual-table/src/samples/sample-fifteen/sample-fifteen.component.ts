import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Any, PlainObject } from '@angular-ru/cdk/typings';
import { TableUpdateSchema } from '@angular-ru/cdk/virtual-table';

import { MocksGenerator } from '../../../../../../tests/virtual-table/helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-fifteen',
    templateUrl: './sample-fifteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFifteenComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];
    constructor(public readonly dialog: MatDialog, private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rows: number = 10000;
        const cols: number = 59;

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

    public updatedSchema(event: TableUpdateSchema): void {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
