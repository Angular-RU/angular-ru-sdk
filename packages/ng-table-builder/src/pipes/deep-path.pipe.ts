import { getValueByPath } from '@angular-ru/common/object';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deepPath' })
export class DeepPathPipe implements PipeTransform {
    public transform(item: PlainObject, path: string | null | undefined, stub: string | undefined = ''): Any {
        const result: Any = getValueByPath(item, path);
        return checkValueIsEmpty(result) ? stub ?? '' : result;
    }
}
