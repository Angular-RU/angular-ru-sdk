import { ChangeDetectorRef, ViewRef } from '@angular/core';

export function detectChanges(cd: ChangeDetectorRef): void {
    if (!(cd as ViewRef).destroyed) {
        cd.detectChanges();
    }
}
