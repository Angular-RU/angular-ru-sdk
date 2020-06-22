import { TableRow } from '@angular-ru/ng-table-builder';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { detectChanges } from '../../../../../src/operators/detect-changes';
import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';
import { DialogTemplateComponent } from '../../shared/dialog-template/dialog-template.component';

@Component({
    selector: 'sample-first-second',
    templateUrl: './sample-first-second.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstSecondComponent implements OnInit, OnDestroy {
    public data: TableRow[] = [];
    private idInterval: number | null = null;

    constructor(
        private readonly cd: ChangeDetectorRef,
        public readonly dialog: MatDialog,
        private readonly ngZone: NgZone
    ) {}

    public ngOnInit(): void {
        const DEFAULT_TIMEOUT: number = 14500;
        this.ngZone.runOutsideAngular((): void => {
            this.idInterval = window.setInterval((): void => {
                this.updateTable();
            }, DEFAULT_TIMEOUT);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.idInterval!);
    }

    public add(): void {
        this.updateTable();
    }

    public delete(row: TableRow): void {
        this.data = this.data.filter((item: TableRow): boolean => item !== row);
        detectChanges(this.cd);
    }

    public edit(row: TableRow): void {
        this.ngZone.run((): void => {
            this.dialog
                .open(DialogTemplateComponent, { data: row, width: '1024px' })
                .afterClosed()
                .subscribe((data: TableRow): void => {
                    if (data) {
                        this.data = this.data.map(
                            (val: TableRow): TableRow => (val.id === data.id ? { ...data } : val)
                        );
                        detectChanges(this.cd);
                    }
                });
        });
    }

    public updateTable(): void {
        const rows: number = 1;
        const cols: number = 10;

        const startIndex: number = this.data.length
            ? Math.max(...this.data.map((item: TableRow): number => item.id))
            : 0;

        MocksGenerator.generator(rows, cols, startIndex).then((row: TableRow[]): void => {
            this.data = this.data.concat(row);
            this.cd.detectChanges();
        });
    }
}
