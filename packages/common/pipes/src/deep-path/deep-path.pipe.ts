import { Pipe, PipeTransform } from '@angular/core';
import { getValueByPath } from '@angular-ru/common/object';
import { Nullable } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

@Pipe({ name: 'deepPath' })
export class DeepPathPipe implements PipeTransform {
    public transform<T, K = unknown>(
        item: T,
        path: Nullable<string>,
        fallback: Nullable<string> = ''
    ): Nullable<K | string> {
        const result: Nullable<K> = getValueByPath<T, K>(item, path);
        return checkValueIsEmpty(result) ? fallback ?? '' : result;
    }
}
