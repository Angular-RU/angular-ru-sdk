import { getValueByPath } from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deepPath' })
export class DeepPathPipe implements PipeTransform {
    public transform<T, K = Any>(
        item: T,
        path: string | null | undefined,
        fallback: K | string | undefined = ''
    ): K | string | undefined {
        const result: K | undefined = getValueByPath<T, K>(item, path);
        return checkValueIsEmpty(result) ? fallback ?? '' : result;
    }
}
