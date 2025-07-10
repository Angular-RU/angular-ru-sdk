import {Pipe, PipeTransform} from '@angular/core';
import {isNil} from '@angular-ru/cdk/utils';

@Pipe({name: 'isNil'})
export class IsNilPipe implements PipeTransform {
    public transform<T>(value: T): boolean {
        return isNil(value);
    }
}
