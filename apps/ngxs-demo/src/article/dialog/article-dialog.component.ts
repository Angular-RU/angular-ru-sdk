import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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
    styles: `
        .content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        mat-form-field {
            padding-top: 0.25rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDialogComponent {
    public dialogRef = inject<MatDialogRef<ArticleDialogComponent>>(MatDialogRef);
    public data = inject<Article>(MAT_DIALOG_DATA);
    private readonly fb = inject(FormBuilder);

    public form: FormGroup;

    constructor() {
        const data = this.data;

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
