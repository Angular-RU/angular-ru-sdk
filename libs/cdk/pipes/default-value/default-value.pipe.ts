import {Pipe, PipeTransform} from '@angular/core';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {checkValueIsEmpty} from '@angular-ru/cdk/utils';

@Pipe({name: 'defaultValue'})
export class DefaultValuePipe implements PipeTransform {
    public transform<T = unknown>(
        item: Nullable<T | PlainObject>,
        fallback: Nullable<string> = '-',
    ): Nullable<PlainObject | T | string> {
        return checkValueIsEmpty(item) ? fallback : item;
    }
}
