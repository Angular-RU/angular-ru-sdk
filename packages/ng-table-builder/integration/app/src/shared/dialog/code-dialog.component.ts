import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Any } from '../../../../../src/interfaces/table-builder.internal';

declare const hljs: Any;

@Component({
    selector: 'code-dialog',
    templateUrl: './code-dialog.template.html'
})
export class CodeDialogComponent implements AfterViewInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Any, public dialogRef: MatDialogRef<unknown>) {}

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }

    public close(): void {
        this.dialogRef.close();
    }
}
