import { Pipe, PipeTransform } from '@angular/core';
import { secondItem } from '@angular-ru/common/array';
import { Nullable } from '@angular-ru/common/typings';

@Pipe({ name: 'takeSecondItem' })
export class TakeSecondItemPipe implements PipeTransform {
    public transform<T>(value?: Nullable<T[]>): Nullable<T> {
        return secondItem(value);
    }
}
