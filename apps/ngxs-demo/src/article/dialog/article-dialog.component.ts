import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

import {Article} from '../article';

@Component({
    selector: 'article-dialog',
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
    ],
    templateUrl: './article-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDialogComponent {
    public form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ArticleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Article,
        private readonly fb: FormBuilder,
    ) {
        this.form = this.fb.group({
            uid: this.fb.control(data.uid, [Validators.required]),
            title: this.fb.control(data.title, [Validators.required]),
            category: this.fb.control(data.category, [Validators.required]),
        });
    }

    public cancel(): void {
        this.dialogRef.close(null);
    }

    public save(): void {
        this.dialogRef.close(this.form.getRawValue());
    }
}
