import { ChangeDetectorRef, ViewRef } from '@angular/core';

type DetectorOrDetectors = ChangeDetectorRef | null | (ChangeDetectorRef | null)[];

export function detectChanges(detectorOrDetectors?: DetectorOrDetectors): void {
    if (!detectorOrDetectors) {
        return;
    }

    if (Array.isArray(detectorOrDetectors)) {
        detectorOrDetectors.forEach((detector: ChangeDetectorRef | null): void => internalDetectChanges(detector));
    } else if (detectorOrDetectors) {
        internalDetectChanges(detectorOrDetectors);
    }
}

function internalDetectChanges(cd?: ChangeDetectorRef | null): void {
    if (cd && !(cd as ViewRef).destroyed) {
        cd.detectChanges();
    }
}
