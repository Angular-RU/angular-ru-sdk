import { firstItem } from '@angular-ru/common/array';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'takeFirstItem' })
export class TakeFirstItemPipe implements PipeTransform {
    public transform<T>(value?: T[] | null): T | null {
        return firstItem(value);
    }
}
