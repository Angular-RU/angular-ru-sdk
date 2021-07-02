import { ElementRef, Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '@angular-ru/common/typings';

import { getClientHeight } from '../operators/get-client-height';
@Pipe({
    name: 'getClientHeight',
    pure: false
})
export class GetClientHeightPipe implements PipeTransform {
    public transform(elementRefs: Nullable<ElementRef> | Nullable<ElementRef>[]): number {
        return getClientHeight(elementRefs);
    }
}
