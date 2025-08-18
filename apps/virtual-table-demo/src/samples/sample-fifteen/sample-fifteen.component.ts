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
import type {TableUpdateSchema} from '@angular-ru/cdk/virtual-table';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-fifteen',
    imports: [MatButton, MatToolbar, VirtualTable],
    templateUrl: './sample-fifteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleFifteenComponent implements OnInit, AfterViewInit {
    private readonly dialog = inject(MatDialog);

    public data = signal<PlainObject[]>([]);

    public ngOnInit(): void {
        const rows = 10000;
        const cols = 59;

        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data.set(data);
        });
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    public updatedSchema(event: TableUpdateSchema): void {
        // eslint-disable-next-line no-console
        console.log(event);
    }

    protected showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview drag-and-drop table',
                description: '',
                code: `
<ngx-table-builder
    [source]="data"
    (schemaChanges)="updatedSchema($event)"
>
    <ngx-options is-draggable />
</ngx-table-builder>
                `,
            },
        });
    }
}
