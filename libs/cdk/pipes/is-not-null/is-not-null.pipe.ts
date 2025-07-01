import {Pipe, PipeTransform} from '@angular/core';
import {isNil} from '@angular-ru/cdk/utils';

@Pipe({standalone: false, name: 'isNotNull'})
export class IsNotNullPipe implements PipeTransform {
    public transform<T>(value: T): boolean {
        return !isNil(value);
    }
}
