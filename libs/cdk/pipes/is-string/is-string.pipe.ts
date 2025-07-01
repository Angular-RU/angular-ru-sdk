import {Pipe, PipeTransform} from '@angular/core';
import {isString} from '@angular-ru/cdk/string';

@Pipe({standalone: false, name: 'isString'})
export class IsStringPipe implements PipeTransform {
    public transform<T>(value: T): boolean {
        return isString(value);
    }
}
