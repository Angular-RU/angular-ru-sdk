import { Any } from '@angular-ru/common/typings';
import { isNil } from '@angular-ru/common/utils';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isNotNull' })
export class IsNotNullPipe implements PipeTransform {
    public transform(value: Any): boolean {
        return !isNil(value);
    }
}
