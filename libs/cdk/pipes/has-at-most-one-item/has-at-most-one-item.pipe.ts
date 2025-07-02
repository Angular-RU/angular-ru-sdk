import {Pipe, PipeTransform} from '@angular/core';
import {hasAtMostOneItem} from '@angular-ru/cdk/array';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({standalone: false, name: 'hasAtMostOneItem'})
export class HasAtMostOneItemPipe implements PipeTransform {
    public transform<EntryType>(
        array?: Nullable<EntryType[]>,
    ): array is [] | [EntryType] {
        return hasAtMostOneItem(array);
    }
}
