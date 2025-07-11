import {KeyValuePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
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
    public form: Nullable<FormGroup> = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<unknown>,
        private readonly fb: FormBuilder,
    ) {}

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
