import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Any } from 'dist/library/typings';

declare const hljs: Any;

@Component({
    selector: 'code-dialog',
    templateUrl: './code-dialog.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
