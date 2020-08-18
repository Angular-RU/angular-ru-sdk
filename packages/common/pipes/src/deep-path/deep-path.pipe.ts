import { getValueByPath } from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deepPath' })
export class DeepPathPipe implements PipeTransform {
    public transform<T = Any>(item: Any, path: string | null | undefined, fallback: string = ''): T | undefined {
        const result: Any = getValueByPath<T>(item, path);
        return checkValueIsEmpty(result) ? fallback ?? '' : result;
    }
}
