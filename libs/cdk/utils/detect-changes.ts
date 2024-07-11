import {ChangeDetectorRef, ViewRef} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {isNil} from './is-nil';
import {isNotNil} from './is-not-nil';

type DetectorOrDetectors =
    | Array<Nullable<ChangeDetectorRef>>
    | Nullable<ChangeDetectorRef>;

export function detectChanges(detectorOrDetectors?: DetectorOrDetectors): void {
    if (isNil(detectorOrDetectors)) {
        return;
    }

    if (Array.isArray(detectorOrDetectors)) {
        for (const detector of detectorOrDetectors) {
            internalDetectChanges(detector);
        }
    } else if (isNotNil(detectorOrDetectors)) {
        internalDetectChanges(detectorOrDetectors);
    }
}

function internalDetectChanges(cd?: Nullable<ChangeDetectorRef>): void {
    if (isNotNil(cd) && !(cd as ViewRef).destroyed) {
        cd.detectChanges();
    }
}
