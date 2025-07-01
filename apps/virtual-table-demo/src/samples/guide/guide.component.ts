import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {PlainObject} from '@angular-ru/cdk/typings';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

@Component({
    standalone: false,
    selector: 'guide',
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideComponent implements AfterViewInit {
    public rowData: PlainObject[] = [
        {make: 'Toyota', model: 'Celica', price: 35000},
        {make: 'Ford', model: 'Mondeo', price: 32000},
        {make: 'Porsche', model: 'Boxter', price: 72000},
    ];

    public ngAfterViewInit(): void {
        hlJsCode();
    }
}
