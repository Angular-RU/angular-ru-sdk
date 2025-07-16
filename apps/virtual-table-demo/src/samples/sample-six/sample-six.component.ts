import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material/dialog';
import {MatToolbar} from '@angular/material/toolbar';
import {PlainObject} from '@angular-ru/cdk/typings';
import type {OrderedField} from '@angular-ru/cdk/virtual-table';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-six',
    imports: [FormsModule, MatButton, MatCheckbox, MatToolbar, VirtualTable],
    templateUrl: './sample-six.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleSixComponent implements OnInit, AfterViewInit {
    public readonly dialog = inject(MatDialog);
    private readonly cd = inject(ChangeDetectorRef);

    public sortByIdDirection = true;
    public data: PlainObject[] = [];
    public skipSort = false;

    public ngOnInit(): void {
        const rows = 10000;
        const cols = 50;

        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    public sortChanges(event: OrderedField[]): void {
        // eslint-disable-next-line no-console
        console.log('orderedField', event);
    }

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview sortable table',
                description: '',
                code: `
<ngx-table-builder
    [source]="data"
    [skip-sort]="skipSort"
    [sort-types]="sortByIdDirection ? { id: 'asc' } : { id: 'desc' }"
    (sortChanges)="sortChanges($event)"
></ngx-table-builder>`,
            },
        });
    }
}
