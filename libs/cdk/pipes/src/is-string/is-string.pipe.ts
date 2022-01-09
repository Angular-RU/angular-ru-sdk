import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '@angular-ru/cdk/string';
import { Any } from '@angular-ru/cdk/typings';

@Pipe({ name: 'isString' })
export class IsStringPipe implements PipeTransform {
    public transform(value: Any): boolean {
        return isString(value);
    }
}
