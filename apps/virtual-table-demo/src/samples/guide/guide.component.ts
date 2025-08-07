import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PlainObject} from '@angular-ru/cdk/typings';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

@Component({
    selector: 'guide',
    imports: [RouterLink, VirtualTable],
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GuideComponent implements AfterViewInit {
    public rowData: PlainObject[] = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000},
    ];

    public ngAfterViewInit(): void {
        hlJsCode();
    }
}
