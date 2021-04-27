import { Pipe, PipeTransform } from '@angular/core';
import { hasAtMostOneItem } from '@angular-ru/common/array';

@Pipe({ name: 'hasAtMostOneItem' })
export class HasAtMostOneItemPipe implements PipeTransform {
    public transform: typeof hasAtMostOneItem = hasAtMostOneItem;
}
