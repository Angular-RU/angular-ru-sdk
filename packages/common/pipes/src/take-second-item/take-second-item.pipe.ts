import { secondItem } from '@angular-ru/common/array';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'takeSecondItem' })
export class TakeSecondItemPipe implements PipeTransform {
    public transform<T>(value?: T[] | null): T | null {
        return secondItem(value);
    }
}
