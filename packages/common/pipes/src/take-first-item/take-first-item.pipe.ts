import { Pipe, PipeTransform } from '@angular/core';
import { firstItem } from '@angular-ru/common/array';

@Pipe({ name: 'takeFirstItem' })
export class TakeFirstItemPipe implements PipeTransform {
    public transform<T>(value?: T[] | null): T | null {
        return firstItem(value);
    }
}
