import {Pipe, PipeTransform} from '@angular/core';
import {isNil} from '@angular-ru/cdk/utils';

@Pipe({standalone: false, name: 'isNil'})
export class IsNilPipe implements PipeTransform {
    public transform<T>(value: T): boolean {
        return isNil(value);
    }
}
