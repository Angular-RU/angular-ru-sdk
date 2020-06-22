import { TableRow } from '@angular-ru/ng-table-builder';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Any } from '../../../../../src/interfaces/table-builder.internal';
import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-seven',
    templateUrl: './sample-seven.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSevenComponent implements OnInit, AfterViewInit {
    public data: TableRow[] = [];

    constructor(private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rowsNumber: number = 10000;
        const cols: number = 30;
        MocksGenerator.generator(rowsNumber, cols).then((data: TableRow[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }

    public alert(row: TableRow): void {
        const space: number = 4;
        window.alert(JSON.stringify(row, null, space));
    }
}
