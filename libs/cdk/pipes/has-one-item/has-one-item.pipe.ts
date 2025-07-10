import {Pipe, PipeTransform} from '@angular/core';
import {hasOneItem} from '@angular-ru/cdk/array';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({name: 'hasOneItem'})
export class HasOneItemPipe implements PipeTransform {
    public transform<EntryType>(array?: Nullable<EntryType[]>): array is [EntryType] {
        return hasOneItem(array);
    }
}
