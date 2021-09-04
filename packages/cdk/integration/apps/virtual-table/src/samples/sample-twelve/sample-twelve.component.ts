import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { Any, PlainObject } from '@angular-ru/cdk/typings';

import { MocksGenerator } from '../../../../../tests/jest/virtual-table/helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-twelve',
    templateUrl: './sample-twelve.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SampleTwelveComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];

    public licences: PlainObject[] = [
        {
            id: 1,
            name: 'single',
            price: 29.3
        },
        {
            id: 2,
            name: 'developer',
            price: 49.8
        },
        {
            id: 3,
            name: 'premium',
            price: 99.5
        },
        {
            id: 4,
            name: 'enterprise',
            price: 199
        }
    ];

    constructor(private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rowNumber: number = 50;
        const colsNumber: number = 15;
        MocksGenerator.generator(rowNumber, colsNumber).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        this.update();
    }

    public update(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }
}
