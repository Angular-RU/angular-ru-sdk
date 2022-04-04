import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '@angular-ru/cdk/string';

@Pipe({ name: 'isString' })
export class IsStringPipe implements PipeTransform {
    public transform(value: any): boolean {
        return isString(value);
    }
}
