import {Pipe, PipeTransform} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

@Pipe({standalone: false, name: 'at'})
export class AtPipe implements PipeTransform {
    public transform<EntryType, ArrayType extends EntryType[]>(
        array: Nullable<ArrayType>,
        index: number,
    ): Nullable<EntryType> {
        if (isNil(array)) {
            return undefined;
        }

        let limitedIndex: number = index;

        limitedIndex = Math.trunc(limitedIndex) || 0;

        if (limitedIndex < 0) {
            limitedIndex += array.length;
        }

        if (limitedIndex < 0 || limitedIndex >= array.length) {
            return undefined;
        }

        return array[limitedIndex];
    }
}
