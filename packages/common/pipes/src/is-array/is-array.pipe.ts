import { Any } from '@angular-ru/common/typings';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isArray' })
export class IsArrayPipe implements PipeTransform {
    public transform(value: Any): boolean {
        return Array.isArray(value);
    }
}
