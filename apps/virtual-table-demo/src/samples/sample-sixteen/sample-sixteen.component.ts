import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import type {TableUpdateSchema} from '@angular-ru/cdk/virtual-table';
import {NgxTableViewChangesService, VirtualTable} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-sixteen',
    imports: [MatButton, MatCheckbox, MatIcon, MatToolbar, VirtualTable],
    templateUrl: './sample-sixteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleSixteenComponent implements OnInit, AfterViewInit {
    private readonly dialog = inject(MatDialog);
    private readonly cd = inject(ChangeDetectorRef);
    private readonly tableChanges = inject(NgxTableViewChangesService);
    private readonly destroyRef = inject(DestroyRef);

    public data: PlainObject[] = [];
    public schema: Nullable<TableUpdateSchema> = null;
    public readonly testName = 'test';

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
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event: TableUpdateSchema): void => this.save(event));
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    private save(event: TableUpdateSchema): void {
        // eslint-disable-next-line no-console
        console.log('update schema', event);
        window.localStorage.setItem(this.testName, JSON.stringify(event));
    }

    protected showSample() {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview persistent state table',
                description: '',
                language: 'typescript',
                code: `
export class MyComponent implements OnInit {
    protected schema: Nullable<TableUpdateSchema> = null;
    private readonly tableChanges = inject(NgxTableViewChangesService);
    private readonly testName = 'test';
    private readonly destroyRef = inject(DestroyRef);
    
    ngOnInit() {
        this.schema = JSON.parse(
            window.localStorage.getItem(this.testName) ?? '{}',
        ) as TableUpdateSchema;
        
        this.tableChanges.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event: TableUpdateSchema) => this.save(event));
    }
    
    private save(event: TableUpdateSchema) {
        window.localStorage.setItem(this.testName, JSON.stringify(event));
    }
}
                `,
            },
        });
    }
}
