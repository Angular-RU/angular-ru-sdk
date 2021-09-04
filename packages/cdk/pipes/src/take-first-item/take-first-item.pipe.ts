import { Pipe, PipeTransform } from '@angular/core';
import { firstItem } from '@angular-ru/cdk/array';
import { Nullable } from '@angular-ru/cdk/typings';

@Pipe({ name: 'takeFirstItem' })
export class TakeFirstItemPipe implements PipeTransform {
    public transform<T>(value?: Nullable<T[]>): Nullable<T> {
        return firstItem(value);
    }
}
