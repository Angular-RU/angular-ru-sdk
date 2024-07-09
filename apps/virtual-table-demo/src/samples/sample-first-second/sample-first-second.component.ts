import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {detectChanges, isNotNil} from '@angular-ru/cdk/utils';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MocksGenerator} from '../../mocks-generator';
import {DialogTemplateComponent} from '../../shared/dialog-template/dialog-template.component';

@Component({
    selector: 'sample-first-second',
    templateUrl: './sample-first-second.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleFirstSecondComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    private idInterval: Nullable<number> = null;
    public data: PlainObject[] = [];

    constructor(
        private readonly cd: ChangeDetectorRef,
        public readonly dialog: MatDialog,
        private readonly ngZone: NgZone,
    ) {}

    public ngOnInit(): void {
        const DEFAULT_TIMEOUT: number = 14500;

        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.idInterval = window.setInterval((): void => {
                this.updateTable();
            }, DEFAULT_TIMEOUT);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.idInterval ?? 0);
        this.destroy$.next();
        this.destroy$.complete();
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
                .open(DialogTemplateComponent, {data: row, width: '1024px'})
                .afterClosed()
                .pipe(takeUntil(this.destroy$))
                .subscribe((data?: PlainObject): void => {
                    if (isNotNil(data)) {
                        this.data = this.data.map(
                            (value: PlainObject): PlainObject =>
                                (value as any)?.id === (data as any)?.id
                                    ? {...data}
                                    : value,
                        );
                        detectChanges(this.cd);
                    }
                });
        });
    }

    public updateTable(): void {
        const rows: number = 1;
        const cols: number = 10;

        const startIndex: number =
            this.data.length > 0
                ? Math.max(
                      ...this.data.map(
                          (item: PlainObject): number => (item as any)?.id ?? 0,
                      ),
                  )
                : 0;

        MocksGenerator.generator(rows, cols, startIndex).then(
            (row: PlainObject[]): void => {
                this.data = this.data.concat(row);
                this.cd.detectChanges();
            },
        );
    }
}
