import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Nullable, PlainObject } from '@angular-ru/common/typings';
import { detectChanges, isNotNil } from '@angular-ru/common/utils';

import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';
import { DialogTemplateComponent } from '../../shared/dialog-template/dialog-template.component';

@Component({
    selector: 'sample-first-second',
    templateUrl: './sample-first-second.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstSecondComponent implements OnInit, OnDestroy {
    public data: PlainObject[] = [];
    private idInterval: Nullable<number> = null;

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

    public delete(row: PlainObject): void {
        this.data = this.data.filter((item: PlainObject): boolean => item !== row);
        detectChanges(this.cd);
    }

    public edit(row: PlainObject): void {
        this.ngZone.run((): void => {
            this.dialog
                .open(DialogTemplateComponent, { data: row, width: '1024px' })
                .afterClosed()
                .subscribe((data?: PlainObject): void => {
                    if (isNotNil(data)) {
                        this.data = this.data.map(
                            (val: PlainObject): PlainObject => (val.id === data.id ? { ...data } : val)
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
            ? Math.max(...this.data.map((item: PlainObject): number => item.id))
            : 0;

        MocksGenerator.generator(rows, cols, startIndex).then((row: PlainObject[]): void => {
            this.data = this.data.concat(row);
            this.cd.detectChanges();
        });
    }
}
