import {Pipe, PipeTransform} from '@angular/core';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {checkValueIsEmpty} from '@angular-ru/cdk/utils';

@Pipe({standalone: false, name: 'defaultValue'})
export class DefaultValuePipe implements PipeTransform {
    public transform<T = unknown>(
        item: Nullable<PlainObject | T>,
        fallback: Nullable<string> = '-',
    ): Nullable<PlainObject | T | string> {
        return checkValueIsEmpty(item) ? fallback : item;
    }
}
