import {
    ChangeDetectionStrategy,
    Component,
    inject,
    NgZone,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatToolbar} from '@angular/material/toolbar';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-first',
    imports: [
        FormsModule,
        MatButton,
        MatCheckbox,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatProgressSpinner,
        MatSelect,
        MatToolbar,
        VirtualTable,
    ],
    templateUrl: './sample-first.component.html',
    styles: `
        .filter-form {
            margin-bottom: 1rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleFirstComponent implements OnInit, OnDestroy {
    public readonly dialog = inject(MatDialog);
    private readonly ngZone = inject(NgZone);

    private idInterval: Nullable<number> = null;
    public width = '100%';
    public height: Nullable<number> = null;
    public rowHeight: Nullable<string> = null;
    public dataSize = '100x20';
    public loading = signal(false);
    public simple = signal<PlainObject[]>([]);
    public regenerate = false;

    public ngOnInit(): void {
        this.updateTable();

        const DEFAULT_TIMEOUT = 14500;

        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.idInterval = window.setInterval((): void => {
                if (this.regenerate) {
                    this.updateTable();
                }
            }, DEFAULT_TIMEOUT);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.idInterval ?? 0);
    }

    // eslint-disable-next-line max-lines-per-function
    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview simple table',
                description:
                    'If you want enabled virtual scroll, you need use auto-height or height attribute.',
                code:
                    '<!-- simple - is Array any objects -->\n' +
                    '<ngx-table-builder [source]="simple"></ngx-table-builder>\n\n\n' +
                    '<!-- also you can set height, width for cell in table -->\n' +
                    '<ngx-table-builder\n' +
                    '   [source]="simple"\n' +
                    '   [width]="width"\n' +
                    '   [height]="height"\n' +
                    '   [row-height]="rowHeight"\n' +
                    '></ngx-table-builder>\n',
            },
        });
    }

    // eslint-disable-next-line max-lines-per-function
    public updateTable(): void {
        this.loading.set(true);

        switch (this.dataSize) {
            case '100000x100':
                {
                    const rows = 100000;
                    const cols = 100;

                    MocksGenerator.generator(rows, cols).then(
                        (data: PlainObject[]): void => this.setData(data),
                    );
                }

                break;

            case '10000x50':
                {
                    const rows = 10000;
                    const cols = 50;

                    MocksGenerator.generator(rows, cols).then(
                        (data: PlainObject[]): void => this.setData(data),
                    );
                }

                break;

            case '1000x30':
                {
                    const rows = 1000;
                    const cols = 30;

                    MocksGenerator.generator(rows, cols).then(
                        (data: PlainObject[]): void => this.setData(data),
                    );
                }

                break;

            case '100x20':
                {
                    const rows = 100;
                    const cols = 20;

                    MocksGenerator.generator(rows, cols).then(
                        (data: PlainObject[]): void => this.setData(data),
                    );
                }

                break;

            case '10x5':
                {
                    const rows = 10;
                    const cols = 5;

                    MocksGenerator.generator(rows, cols).then(
                        (data: PlainObject[]): void => this.setData(data),
                    );
                }

                break;
        }
    }

    private setData(data: PlainObject[]): void {
        this.simple.set(data);
        const timeout = 500;

        window.setTimeout((): void => {
            this.loading.set(false);
        }, timeout);
    }
}
