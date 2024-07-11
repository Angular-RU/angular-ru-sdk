import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PlainObject} from '@angular-ru/cdk/typings';

import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-eighteen',
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
export class SampleEighteenComponent implements OnInit {
    public data: PlainObject[] = [];
    public rowCssClasses: PlainObject = {1: ['highlight'], 3: ['highlight']};

    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
    ) {}

    public ngOnInit(): void {
        const rows = 50;
        const cols = 5;

        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
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
    <!-- rowCssClasses === \{ 1: ['highlight'], 3: ['highlight'] \} -->
    <ngx-empty>No data</ngx-empty>
    <ngx-source-null>Loading</ngx-source-null>
    <ngx-options is-sortable></ngx-options>
</ngx-table-builder>
                `,
            },
            height: '350px',
            width: '700px',
        });
    }
}
