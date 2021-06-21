import { Pipe, PipeTransform } from '@angular/core';
import { firstItem } from '@angular-ru/common/array';
import { Nullable } from '@angular-ru/common/typings';

@Pipe({ name: 'takeFirstItem' })
export class TakeFirstItemPipe implements PipeTransform {
    public transform<T>(value?: Nullable<T[]>): Nullable<T> {
        return firstItem(value);
    }
}
