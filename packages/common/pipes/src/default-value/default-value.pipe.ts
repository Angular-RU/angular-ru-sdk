import { Pipe, PipeTransform } from '@angular/core';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

@Pipe({ name: 'defaultValue' })
export class DefaultValuePipe implements PipeTransform {
    public transform<T>(value: T, fallback: string = '-'): T | string {
        return checkValueIsEmpty(value) ? fallback : value;
    }
}
