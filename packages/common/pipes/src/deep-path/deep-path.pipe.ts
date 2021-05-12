import { Pipe, PipeTransform } from '@angular/core';
import { getValueByPath } from '@angular-ru/common/object';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

@Pipe({ name: 'deepPath' })
export class DeepPathPipe implements PipeTransform {
    public transform<T, K = unknown>(
        item: T,
        path: string | null | undefined,
        fallback: string | null | undefined = ''
    ): K | string | null | undefined {
        const result: K | null | undefined = getValueByPath<T, K>(item, path);
        return checkValueIsEmpty(result) ? fallback ?? '' : result;
    }
}
