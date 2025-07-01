import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {PlainObject} from '@angular-ru/cdk/typings';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';

@Component({
    standalone: false,
    selector: 'sample-twelve',
    templateUrl: './sample-twelve.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleTwelveComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];

    public licences: PlainObject[] = [
        {
            id: 1,
            name: 'single',
            price: 29.3,
        },
        {
            id: 2,
            name: 'developer',
            price: 49.8,
        },
        {
            id: 3,
            name: 'premium',
            price: 99.5,
        },
        {
            id: 4,
            name: 'enterprise',
            price: 199,
        },
    ];

    constructor(private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rowNumber = 50;
        const colsNumber = 15;

        MocksGenerator.generator(rowNumber, colsNumber).then(
            (data: PlainObject[]): void => {
                this.data = data;
                this.cd.detectChanges();
            },
        );
    }

    public ngAfterViewInit(): void {
        this.update();
    }

    public update(): void {
        hlJsCode();
    }
}
