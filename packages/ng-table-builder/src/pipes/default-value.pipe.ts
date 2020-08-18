import { Any, PlainObject } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'defaultValue' })
export class DefaultValuePipe implements PipeTransform {
    public transform(item: PlainObject, key: string | null | undefined, stub: string): Any {
        const result: Any = item[key!];
        return checkValueIsEmpty(result) ? stub : result;
    }
}
