import {KeyValuePipe, UpperCasePipe} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDateRangeInput,
    MatDateRangePicker,
    MatEndDate,
    MatStartDate,
} from '@angular/material/datepicker';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {Nullable} from '@angular-ru/cdk/typings';
import {
    FilterStateEvent,
    TableBuilder,
    TableFilterType,
} from '@angular-ru/cdk/virtual-table';

@Component({
    selector: 'context-menu-sample',
    imports: [
        FormsModule,
        KeyValuePipe,
        MatButtonToggle,
        MatButtonToggleGroup,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDateRangeInput,
        MatDateRangePicker,
        MatEndDate,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatStartDate,
        MatSuffix,
        UpperCasePipe,
    ],
    templateUrl: './context-menu-sample.component.html',
    styles: [
        `
            .date-picker .mat-form-field-infix {
                display: inline-flex;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuSampleComponent<T> {
    @Input()
    public table!: TableBuilder<T>;

    @Input()
    public state!: Partial<FilterStateEvent>;

    public TableFilterType: typeof TableFilterType = TableFilterType;
    public dateRange: Array<Nullable<Date>> = [null, null];

    public changeDateRange(): void {
        if (this.dateRange[0] || this.dateRange[1]) {
            this.table.filterable.updateFilterValueBy(this.dateRange, this.state.key);
        } else {
            this.table.filterable.updateFilterValueBy(null, this.state.key);
        }

        this.table.filter();
    }

    public updateFilterType(event: unknown): void {
        this.table.filterable.updateFilterTypeBy(event as any, this.state.key);
        this.table.filter();
    }
}
