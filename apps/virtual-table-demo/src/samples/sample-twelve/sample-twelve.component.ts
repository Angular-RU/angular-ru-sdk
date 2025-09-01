import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    signal,
    ViewEncapsulation,
} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {PlainObject} from '@angular-ru/cdk/typings';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';

@Component({
    selector: 'sample-twelve',
    imports: [MatToolbar, VirtualTable],
    templateUrl: './sample-twelve.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleTwelveComponent implements OnInit, AfterViewInit {
    public data = signal<PlainObject[]>([]);

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

    public ngOnInit(): void {
        const rowNumber = 50;
        const colsNumber = 15;

        MocksGenerator.generator(rowNumber, colsNumber).then(
            (data: PlainObject[]): void => {
                this.data.set(data);
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
