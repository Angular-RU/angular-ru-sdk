import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TableUpdateSchema} from '@angular-ru/cdk/virtual-table';

interface LicenseSample {
    id: number;
    name: string;
    price: number;
    project: {value: number};
}

@Component({
    standalone: false,
    selector: 'sample-seventeen',
    templateUrl: './sample-seventeen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleSeventeenComponent {
    public invalidCachedSchema: TableUpdateSchema = {
        name: 'hello',
        version: 1,
        columns: [
            {key: 'invalidId', width: 200},
            {key: 'name', width: 200},
            {key: 'helloWorld', width: 200},
            {key: 'price', width: 200},
            {key: 'id', width: 200},
        ],
    };

    public licenses: LicenseSample[] = [
        {
            id: 1,
            name: 'single',
            price: 29.3,
            project: {
                value: 1,
            },
        },
        {
            id: 2,
            name: 'developer',
            price: 49.8,
            project: {
                value: 2,
            },
        },
        {
            id: 3,
            name: 'premium',
            price: 99.5,
            project: {
                value: 3,
            },
        },
        {
            id: 4,
            name: 'enterprise',
            price: 199,
            project: {
                value: 4,
            },
        },
    ];
}
