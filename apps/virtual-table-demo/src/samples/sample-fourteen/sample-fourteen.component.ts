import {KeyValuePipe} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
    viewChild,
    ViewEncapsulation,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatToolbar} from '@angular/material/toolbar';
import {PlainObject} from '@angular-ru/cdk/typings';
import {TableBuilder, TableFilterType, VirtualTable} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';
import {ContextMenuSampleComponent} from './context-menu-sample/context-menu-sample.component';
import {NotFoundComponent} from './not-found.component';

// noinspection CssUnusedSymbol
@Component({
    selector: 'sample-fourteen',
    imports: [
        ContextMenuSampleComponent,
        FormsModule,
        KeyValuePipe,
        MatButton,
        MatCheckbox,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatSuffix,
        MatToolbar,
        NotFoundComponent,
        VirtualTable,
    ],
    templateUrl: './sample-fourteen.component.html',
    styles: [
        `
            .filter-example .table-grid__column {
                text-transform: uppercase;
            }

            .filter-example .table-grid__cell > * {
                font-size: 12px;
            }

            .filter-example .table-grid__header-cell {
                min-height: 50px;
                max-height: 50px;
            }

            context-menu-sample .my-filter {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleFourteenComponent implements OnInit, AfterViewInit {
    public readonly dialog = inject(MatDialog);

    public readonly table = viewChild.required<TableBuilder<PlainObject>>('table');

    public data = signal<PlainObject[]>([]);

    public ngOnInit(): void {
        const rows = 10000;
        const cols = 59;

        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data.set(data);
        });
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    public clearFilter(): void {
        this.table().filterable.reset();
    }

    public filterFromFifth(): void {
        this.table().filterable.setDefinition([
            {key: 'id', type: TableFilterType.MORE_OR_EQUAL, value: 5},
        ]);
        this.table().filter();
    }

    // eslint-disable-next-line max-lines-per-function
    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview selection table',
                description:
                    'In order to use the API for string highlighting, you can use the table.selection service. <br>' +
                    'In more detail you can read in the guide.',
                code: `
    <ngx-filter #filter>
        <div class="my-filter">
            <mat-form-field>
                <mat-label>Find options</mat-label>
                <mat-select
                    [value]="table.filterable.filterTypeDefinition[filter.state.key!]"
                    (valueChange)="table.filterable.updateFilterTypeBy($event, filter.state.key); table.filter()"
                >
                @for (type of table.filterable.types | keyvalue; track type.key) {
                    <mat-option [value]="type.value">
                        {{ type.key }}
                    </mat-option>
                }
                </mat-select>
            </mat-form-field>

            <mat-form-field>
                <mat-label>Filter by {{ filter.state.key! | uppercase }}</mat-label>
                <input
                    matInput
                    name="width"
                    autocomplete="off"
                    [ngModel]="table.filterable.definition[filter.state.key!]"
                    (ngModelChange)="table.filterable.updateFilterValueBy($event, filter.state.key); table.filter()"
                />
                <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
        </div>
    </ngx-filter>
                    `,
            },
        });
    }
}
