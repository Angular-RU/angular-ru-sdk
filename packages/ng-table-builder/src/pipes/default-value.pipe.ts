import { Any, PlainObject } from '@angular-ru/common/typings';
import { Pipe, PipeTransform } from '@angular/core';

import { checkValueIsEmpty } from '../operators/check-value-is-empty';

@Pipe({ name: 'defaultValue' })
export class DefaultValuePipe implements PipeTransform {
    public transform(item: PlainObject, key: string | null | undefined, stub: string): Any {
        const result: Any = item[key!];
        return checkValueIsEmpty(result) ? stub : result;
    }
}
