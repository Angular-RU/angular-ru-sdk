import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Nullable} from '@angular-ru/cdk/typings';

@Component({
    standalone: false,
    selector: 'dialog-template',
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
