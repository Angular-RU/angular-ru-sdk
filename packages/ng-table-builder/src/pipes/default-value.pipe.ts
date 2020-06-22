import { Pipe, PipeTransform } from '@angular/core';

import { Any, KeyMap } from '../interfaces/table-builder.internal';
import { checkValueIsEmpty } from '../operators/check-value-is-empty';

@Pipe({ name: 'defaultValue', pure: true })
export class DefaultValuePipe implements PipeTransform {
    public transform(item: KeyMap, key: string | null | undefined, stub: string): Any {
        const result: Any = item[key!];
        return checkValueIsEmpty(result) ? stub : result;
    }
}
