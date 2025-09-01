import {AfterViewInit, ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

@Component({
    selector: 'code-dialog',
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
    ],
    templateUrl: './code-dialog.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeDialogComponent implements AfterViewInit {
    public data = inject(MAT_DIALOG_DATA);

    public ngAfterViewInit(): void {
        hlJsCode();
    }
}
