import { Any, PlainObject } from '@angular-ru/common/typings';
import { Pipe, PipeTransform } from '@angular/core';

import { checkValueIsEmpty } from '../operators/check-value-is-empty';
import { getDeepValue } from '../operators/deep-value';

@Pipe({ name: 'deepPath', pure: true })
export class DeepPathPipe implements PipeTransform {
    public transform(item: PlainObject, path: string | null | undefined, stub: string | undefined = ''): Any {
        const result: Any = getDeepValue(item, path);
        return checkValueIsEmpty(result) ? stub ?? '' : result;
    }
}
