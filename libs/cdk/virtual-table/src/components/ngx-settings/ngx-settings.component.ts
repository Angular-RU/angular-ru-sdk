import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { TableBuilderComponent } from '../../table-builder.component';

@Component({
    selector: 'ngx-settings',
    templateUrl: './ngx-settings.component.html',
    styleUrls: ['./ngx-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxSettingsComponent<T> {
    public form: FormGroup;
    public isScaleSettingsEnabled: boolean = false;

    constructor(public readonly table: TableBuilderComponent<T>, private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            customRowsOption: new FormControl('auto'),
            fontSize: new FormControl('24'),
            checkeredLine: new FormControl(false),
            hideEmptyColumnAndRows: new FormControl(false)
        });
    }

    public get isCustomFontSizeSliderEnabled(): boolean {
        return this.form.get('customRowsOption')?.value === 'custom';
    }

    public changeSchema(event: CdkDragDrop<string[]>): void {
        const schema: ColumnsSchema[] = this.table.columnSchema;

        moveItemInArray(schema, event.previousIndex, event.currentIndex);
        this.table.changeSchema(schema);
    }
}
