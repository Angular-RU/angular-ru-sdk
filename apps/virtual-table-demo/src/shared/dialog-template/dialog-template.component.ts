import {KeyValuePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatInput} from '@angular/material/input';
import {Nullable} from '@angular-ru/cdk/typings';

@Component({
    selector: 'dialog-template',
    imports: [
        FormsModule,
        KeyValuePipe,
        MatButton,
        MatFormField,
        MatInput,
        ReactiveFormsModule,
    ],
    templateUrl: './dialog-template.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTemplateComponent implements OnInit {
    public data = inject(MAT_DIALOG_DATA);
    public dialogRef = inject<MatDialogRef<unknown>>(MatDialogRef);
    private readonly fb = inject(FormBuilder);

    public form: Nullable<FormGroup> = null;

    public ngOnInit(): void {
        this.form = this.fb.group({
            ...this.data,
            id: new FormControl({value: this.data.id, disabled: true}),
        });
    }

    public save(): void {
        this.dialogRef.close(this.form?.getRawValue());
    }
}
