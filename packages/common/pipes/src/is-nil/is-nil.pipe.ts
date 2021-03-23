import { Pipe, PipeTransform } from '@angular/core';
import { Any } from '@angular-ru/common/typings';
import { isNil } from '@angular-ru/common/utils';

@Pipe({ name: 'isNil' })
export class IsNilPipe implements PipeTransform {
    public transform(value: Any): boolean {
        return isNil(value);
    }
}
