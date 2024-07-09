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
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-five',
    templateUrl: './sample-five.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleFiveComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];
    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
    ) {}

    public ngOnInit(): void {
        const rows: number = 1000;
        const cols: number = 40;

        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview resizable table',
                description: '',
                code: `
<ngx-table-builder [source]="data">
    <!--
       <ngx-options /> - declaration common options for columns

       Also you can customize your columns manually
       <ngx-column key="myKey" [resizable]="true">...</ngx-column>
    -->
    <ngx-options is-draggable></ngx-options>
</ngx-table-builder>

                `,
            },
            height: '350px',
            width: '700px',
        });
    }

    public updatedSchema(event: TableUpdateSchema): void {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
