import { Pipe, PipeTransform } from '@angular/core';
import { hasItems } from '@angular-ru/common/array';

@Pipe({ name: 'hasItems' })
export class HasItemsPipe implements PipeTransform {
    public transform: typeof hasItems = hasItems;
}
