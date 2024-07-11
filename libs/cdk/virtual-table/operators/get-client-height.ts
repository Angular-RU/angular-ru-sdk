import {ElementRef} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

export function getClientHeight(
    elementRefs: Array<Nullable<ElementRef>> | Nullable<ElementRef>,
): number {
    if (Array.isArray(elementRefs)) {
        return elementRefs.reduce(
            (sum: number, elementRef: Nullable<ElementRef>): number =>
                sum + (elementRef?.nativeElement?.clientHeight ?? 0),
            0,
        );
    }

    return elementRefs?.nativeElement?.clientHeight ?? 0;
}
