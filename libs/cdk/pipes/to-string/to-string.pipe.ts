import {Pipe, PipeTransform} from '@angular/core';
import {toStringValue} from '@angular-ru/cdk/string';
import {isNotNil} from '@angular-ru/cdk/utils';

@Pipe({name: 'toString'})
export class ToStringPipe implements PipeTransform {
    public transform<T>(value: T, converter?: (value: T) => string): string {
        return isNotNil(value) ? toStringValue(value, converter) : '';
    }
}
