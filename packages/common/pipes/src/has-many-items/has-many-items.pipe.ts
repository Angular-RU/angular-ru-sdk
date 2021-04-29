import { Pipe, PipeTransform } from '@angular/core';
import { hasManyItems } from '@angular-ru/common/array';

@Pipe({ name: 'hasManyItems' })
export class HasManyItemsPipe implements PipeTransform {
    public transform: typeof hasManyItems = hasManyItems;
}
