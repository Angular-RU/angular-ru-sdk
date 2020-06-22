import { TableRow } from '@angular-ru/ng-table-builder';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstComponent implements OnInit, OnDestroy {
    public width: string = '100%';
    public height: number | null = null;
    public rowHeight: string | null = null;
    public dataSize: string = '100x20';
    public loading: boolean = false;
    public simple: TableRow[] = [];
    public regenerate: boolean = false;
    private idInterval: number | null = null;

    constructor(
        private readonly cd: ChangeDetectorRef,
        public readonly dialog: MatDialog,
        private readonly ngZone: NgZone
    ) {}

    public ngOnInit(): void {
        this.updateTable();

        const DEFAULT_TIMEOUT: number = 14500;
        this.ngZone.runOutsideAngular((): void => {
            this.idInterval = window.setInterval((): void => {
                if (this.regenerate) {
                    this.updateTable();
                }
            }, DEFAULT_TIMEOUT);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.idInterval!);
    }

    // eslint-disable-next-line max-lines-per-function
    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview simple table',
                description: 'If you want enabled virtual scroll, you need use auto-height or height attribute.',
                code:
                    `<!-- simple - is Array any objects -->\n` +
                    `<ngx-table-builder [source]="simple"></ngx-table-builder>\n\n\n` +
                    `<!-- also you can set height, width for cell in table -->\n` +
                    `<ngx-table-builder\n` +
                    `   [source]="simple"\n` +
                    `   [width]="width"\n` +
                    `   [height]="height"\n` +
                    `   [row-height]="rowHeight"\n` +
                    `></ngx-table-builder>\n`
            },
            height: '450px',
            width: '600px'
        });
    }

    // eslint-disable-next-line max-lines-per-function
    public updateTable(): void {
        this.loading = true;
        switch (this.dataSize) {
            case '10x5':
                {
                    const rows: number = 10;
                    const cols: number = 5;
                    MocksGenerator.generator(rows, cols).then((data: TableRow[]): void => this.setData(data));
                }
                break;

            case '100x20':
                {
                    const rows: number = 100;
                    const cols: number = 20;
                    MocksGenerator.generator(rows, cols).then((data: TableRow[]): void => this.setData(data));
                }
                break;

            case '1000x30':
                {
                    const rows: number = 1000;
                    const cols: number = 30;
                    MocksGenerator.generator(rows, cols).then((data: TableRow[]): void => this.setData(data));
                }
                break;

            case '10000x50':
                {
                    const rows: number = 10000;
                    const cols: number = 50;
                    MocksGenerator.generator(rows, cols).then((data: TableRow[]): void => this.setData(data));
                }
                break;

            case '100000x100':
                {
                    const rows: number = 100000;
                    const cols: number = 100;
                    MocksGenerator.generator(rows, cols).then((data: TableRow[]): void => this.setData(data));
                }
                break;
        }
        this.cd.detectChanges();
    }

    private setData(data: TableRow[]): void {
        this.simple = data;
        const timeout: number = 500;
        window.setTimeout((): void => {
            this.loading = false;
            this.cd.detectChanges();
        }, timeout);
    }
}
