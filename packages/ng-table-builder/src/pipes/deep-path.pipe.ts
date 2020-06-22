import { Pipe, PipeTransform } from '@angular/core';

import { Any, KeyMap } from '../interfaces/table-builder.internal';
import { checkValueIsEmpty } from '../operators/check-value-is-empty';
import { getDeepValue } from '../operators/deep-value';

@Pipe({ name: 'deepPath', pure: true })
export class DeepPathPipe implements PipeTransform {
    public transform(item: KeyMap, path: string | null | undefined, stub: string = ''): Any {
        const result: Any = getDeepValue(item, path);
        return checkValueIsEmpty(result) ? stub : result;
    }
}
