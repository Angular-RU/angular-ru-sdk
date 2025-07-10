import {Pipe, PipeTransform} from '@angular/core';
import {hasNoItems} from '@angular-ru/cdk/array';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({name: 'hasNoItems'})
export class HasNoItemsPipe implements PipeTransform {
    public transform<EntryType>(array?: Nullable<EntryType[]>): array is [] {
        return hasNoItems(array);
    }
}
