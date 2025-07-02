import {Pipe, PipeTransform} from '@angular/core';
import {hasManyItems} from '@angular-ru/cdk/array';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({standalone: false, name: 'hasManyItems'})
export class HasManyItemsPipe implements PipeTransform {
    public transform<EntryType>(
        array?: Nullable<EntryType[]>,
    ): array is [EntryType, EntryType, ...EntryType[]] {
        return hasManyItems(array);
    }
}
