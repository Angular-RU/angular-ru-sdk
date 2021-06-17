import { ChangeDetectorRef, ViewRef } from '@angular/core';
import { isNil, isNotNil } from '@angular-ru/common/utils';

import { isNil } from './is-nil';
import { isNotNil } from './is-not-nil';

type DetectorOrDetectors = ChangeDetectorRef | null | (ChangeDetectorRef | null)[];

export function detectChanges(detectorOrDetectors?: DetectorOrDetectors): void {
    if (isNil(detectorOrDetectors)) {
        return;
    }

    if (Array.isArray(detectorOrDetectors)) {
        detectorOrDetectors.forEach((detector: ChangeDetectorRef | null): void => internalDetectChanges(detector));
    } else if (isNotNil(detectorOrDetectors)) {
        internalDetectChanges(detectorOrDetectors);
    }
}

function internalDetectChanges(cd?: ChangeDetectorRef | null): void {
    if (cd && !(cd as ViewRef).destroyed) {
        cd.detectChanges();
    }
}
