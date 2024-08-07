import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {
    NgxTableViewChangesService,
    TableUpdateSchema,
} from '@angular-ru/cdk/virtual-table';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';

@Component({
    selector: 'sample-sixteen',
    templateUrl: './sample-sixteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleSixteenComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();
    public data: PlainObject[] = [];
    public schema: Nullable<TableUpdateSchema> = null;
    public readonly testName: string = 'test';

    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
        private readonly tableChanges: NgxTableViewChangesService,
    ) {}

    public ngOnInit(): void {
        this.schema = JSON.parse(
            window.localStorage.getItem(this.testName) ?? '{}',
        ) as TableUpdateSchema;
        const rowNumber = 3;
        const colsNumber = 10;

        MocksGenerator.generator(rowNumber, colsNumber).then(
            (data: PlainObject[]): void => {
                this.data = data;
                this.cd.detectChanges();
            },
        );

        this.tableChanges.events$
            .pipe(takeUntil(this.destroy$))
            .subscribe((event: TableUpdateSchema): void => this.save(event));
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private save(event: TableUpdateSchema): void {
        // eslint-disable-next-line no-console
        console.log('update schema', event);
        window.localStorage.setItem(this.testName, JSON.stringify(event));
    }
}
