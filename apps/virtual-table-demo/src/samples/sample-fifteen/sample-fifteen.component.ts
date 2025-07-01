import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PlainObject} from '@angular-ru/cdk/typings';
import {TableUpdateSchema} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';

@Component({
    standalone: false,
    selector: 'sample-fifteen',
    templateUrl: './sample-fifteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleFifteenComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];
    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
    ) {}

    public ngOnInit(): void {
        const rows = 10000;
        const cols = 59;

        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    public updatedSchema(event: TableUpdateSchema): void {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
