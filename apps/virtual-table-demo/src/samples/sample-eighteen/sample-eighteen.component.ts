import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
    ViewEncapsulation,
} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatToolbar} from '@angular/material/toolbar';
import {PlainObject} from '@angular-ru/cdk/typings';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-eighteen',
    imports: [MatButton, MatToolbar, VirtualTable],
    templateUrl: './sample-eighteen.component.html',
    styles: [
        `
            .highlight {
                background: lightgreen;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleEighteenComponent implements OnInit {
    public readonly dialog = inject(MatDialog);

    public data = signal<PlainObject[]>([]);
    public rowCssClasses: PlainObject = {1: ['highlight'], 3: ['highlight']};

    public ngOnInit(): void {
        const rows = 50;
        const cols = 5;

        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data.set(data);
        });
    }

    // eslint-disable-next-line max-lines-per-function
    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview sortable table',
                description: '',
                code: `
<ngx-table-builder
    [source]="data"
    [row-css-classes]="rowCssClasses"
    primary-key="id"
>
    <!-- rowCssClasses === { 1: ['highlight'], 3: ['highlight'] } -->
    <ngx-empty>No data</ngx-empty>
    <ngx-source-null>Loading</ngx-source-null>
    <ngx-options is-sortable></ngx-options>
</ngx-table-builder>
                `,
            },
        });
    }
}
