import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatToolbar} from '@angular/material/toolbar';
import {PlainObject} from '@angular-ru/cdk/typings';
import {TableUpdateSchema, VirtualTable} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-five',
    imports: [MatButton, MatToolbar, VirtualTable],
    templateUrl: './sample-five.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleFiveComponent implements OnInit, AfterViewInit {
    public readonly dialog = inject(MatDialog);

    public data = signal<PlainObject[]>([]);

    public ngOnInit(): void {
        const rows = 1000;
        const cols = 40;

        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data.set(data);
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
    <ngx-options is-draggable is-resizable />
</ngx-table-builder>

                `,
            },
        });
    }

    public updatedSchema(event: TableUpdateSchema): void {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
