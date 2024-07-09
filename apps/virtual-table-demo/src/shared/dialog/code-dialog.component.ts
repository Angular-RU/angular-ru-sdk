import {AfterViewInit, ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

@Component({
    selector: 'code-dialog',
    templateUrl: './code-dialog.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeDialogComponent implements AfterViewInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: unknown | any,
        public dialogRef: MatDialogRef<unknown>,
    ) {}

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    public close(): void {
        this.dialogRef.close();
    }
}
