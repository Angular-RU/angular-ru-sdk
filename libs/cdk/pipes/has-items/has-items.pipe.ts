import {Pipe, PipeTransform} from '@angular/core';
import {hasItems} from '@angular-ru/cdk/array';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({name: 'hasItems'})
export class HasItemsPipe implements PipeTransform {
    public transform<EntryType>(
        array?: Nullable<EntryType[]>,
    ): array is [EntryType, ...EntryType[]] {
        return hasItems(array);
    }
}
