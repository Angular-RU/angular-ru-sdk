import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PlainObject} from '@angular-ru/cdk/typings';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

@Component({
    standalone: false,
    selector: 'sample-fourth',
    templateUrl: './sample-fourth.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleFourthComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];
    public elements: PlainObject[] = [];

    // eslint-disable-next-line max-lines-per-function
    public ngOnInit(): void {
        this.data = [
            {
                toppings: ['tomato sauce', 'mozzarella cheese'],
                prices: {
                    small: '5.00',
                    medium: '6.00',
                    large: '7.00',
                },
            },
            {
                toppings: ['tomato sauce', 'mozzarella cheese', 'ham'],
                prices: {
                    small: '6.50',
                    medium: '7.50',
                    large: '8.50',
                },
            },
        ];

        this.elements = [
            {
                position: null,
                name: 'Hydrogen',
                date: {value: NaN},
                symbol: 'H',
                status: true,
            },
            {
                position: 2,
                name: '',
                date: {value: new Date()},
                symbol: undefined,
                status: false,
            },
            {
                position: 3,
                name: 'Lithium',
                date: {value: Infinity},
                symbol: 'Li',
                status: true,
            },
            {
                position: 4,
                name: 'Beryllium',
                date: {value: 0},
                symbol: '    ',
                status: false,
            },
        ];
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }
}
