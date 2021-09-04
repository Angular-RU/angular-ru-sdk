import { Pipe, PipeTransform } from '@angular/core';
import { hasOneItem } from '@angular-ru/cdk/array';

@Pipe({ name: 'hasOneItem' })
export class HasOneItemPipe implements PipeTransform {
    public transform: typeof hasOneItem = hasOneItem;
}
