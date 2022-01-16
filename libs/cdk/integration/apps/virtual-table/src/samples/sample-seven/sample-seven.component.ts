import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Any, PlainObject } from '@angular-ru/cdk/typings';

import { MocksGenerator } from '../../../../../../tests/virtual-table/helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-seven',
    templateUrl: './sample-seven.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSevenComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];

    constructor(private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rowsNumber: number = 10000;
        const cols: number = 30;

        MocksGenerator.generator(rowsNumber, cols).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }

    public alert(row: PlainObject): void {
        const space: number = 4;

        window.alert(JSON.stringify(row, null, space));
    }
}
