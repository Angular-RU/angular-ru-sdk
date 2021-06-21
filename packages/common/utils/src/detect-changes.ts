import { ChangeDetectorRef, ViewRef } from '@angular/core';
import { Nullable } from '@angular-ru/common/typings';

import { isNil } from './is-nil';
import { isNotNil } from './is-not-nil';

type DetectorOrDetectors = Nullable<ChangeDetectorRef> | Nullable<ChangeDetectorRef>[];

export function detectChanges(detectorOrDetectors?: DetectorOrDetectors): void {
    if (isNil(detectorOrDetectors)) {
        return;
    }

    if (Array.isArray(detectorOrDetectors)) {
        detectorOrDetectors.forEach((detector: Nullable<ChangeDetectorRef>): void => internalDetectChanges(detector));
    } else if (isNotNil(detectorOrDetectors)) {
        internalDetectChanges(detectorOrDetectors);
    }
}

function internalDetectChanges(cd?: Nullable<ChangeDetectorRef>): void {
    if (isNotNil(cd) && !(cd as ViewRef).destroyed) {
        cd.detectChanges();
    }
}
