import { Pipe, PipeTransform } from '@angular/core';
import { PlainObject } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

@Pipe({ name: 'defaultValue' })
export class DefaultValuePipe implements PipeTransform {
    public transform<T = unknown>(
        item: T | null | undefined | PlainObject,
        fallback: string | null | undefined = '-'
    ): PlainObject | T | string | null {
        return checkValueIsEmpty(item) ? fallback : item;
    }
}
