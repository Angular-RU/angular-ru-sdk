import { Pipe, PipeTransform } from '@angular/core';
import { Any } from '@angular-ru/cdk/typings';
import { isNil } from '@angular-ru/cdk/utils';

@Pipe({ name: 'isNotNull' })
export class IsNotNullPipe implements PipeTransform {
    public transform(value: Any): boolean {
        return !isNil(value);
    }
}
