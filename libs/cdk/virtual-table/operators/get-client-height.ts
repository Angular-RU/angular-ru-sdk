import {ElementRef} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

export function getClientHeight(
    elementRefs: Nullable<ElementRef> | Nullable<ElementRef>[],
): number {
    if (Array.isArray(elementRefs)) {
        return elementRefs.reduce(
            (sum: number, elementRef: Nullable<ElementRef>): number =>
                sum + (elementRef?.nativeElement?.clientHeight ?? 0),
            0,
        );
    } else {
        return elementRefs?.nativeElement?.clientHeight ?? 0;
    }
}
