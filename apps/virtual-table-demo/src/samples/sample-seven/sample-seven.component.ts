import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {PlainObject} from '@angular-ru/cdk/typings';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';

@Component({
    selector: 'sample-seven',
    templateUrl: './sample-seven.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleSevenComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];

    constructor(private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rowsNumber = 10000;
        const cols = 30;

        MocksGenerator.generator(rowsNumber, cols).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    public alert(row: PlainObject): void {
        const space = 4;

        window.alert(JSON.stringify(row, null, space));
    }
}
