import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from '@angular-ru/common/utils';

@Pipe({ name: 'at' })
export class AtPipe implements PipeTransform {
    public transform<EntryType, ArrayType extends EntryType[]>(
        array: ArrayType | null | undefined,
        index: number
    ): EntryType | undefined {
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
