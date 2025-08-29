import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    signal,
} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {MatToolbar} from '@angular/material/toolbar';
import {PlainObject} from '@angular-ru/cdk/typings';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';

@Component({
    selector: 'sample-seven',
    imports: [MatButton, MatTab, MatTabContent, MatTabGroup, MatToolbar, VirtualTable],
    templateUrl: './sample-seven.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleSevenComponent implements OnInit, AfterViewInit {
    public data = signal<PlainObject[]>([]);

    public ngOnInit(): void {
        const rowsNumber = 10000;
        const cols = 30;

        MocksGenerator.generator(rowsNumber, cols).then((data: PlainObject[]): void => {
            this.data.set(data);
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
