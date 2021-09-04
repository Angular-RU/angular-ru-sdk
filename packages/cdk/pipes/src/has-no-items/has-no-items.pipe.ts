import { Pipe, PipeTransform } from '@angular/core';
import { hasNoItems } from '@angular-ru/cdk/array';

@Pipe({ name: 'hasNoItems' })
export class HasNoItemsPipe implements PipeTransform {
    public transform: typeof hasNoItems = hasNoItems;
}
