import {ElementRef, Pipe, PipeTransform} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {getClientHeight} from '../operators/get-client-height';

@Pipe({
    name: 'getClientHeight',
    // eslint-disable-next-line @angular-eslint/no-pipe-impure
    pure: false,
})
export class GetClientHeightPipe implements PipeTransform {
    public transform(
        elementReferences: Nullable<ElementRef> | Nullable<ElementRef>[],
    ): number {
        return getClientHeight(elementReferences);
    }
}
