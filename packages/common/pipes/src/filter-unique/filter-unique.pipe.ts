import { Pipe, PipeTransform } from '@angular/core';
import { uniqueArrayOf } from '@angular-ru/common/array';
import { Any } from '@angular-ru/common/typings';

@Pipe({ name: 'filterUnique' })
export class FilterUniquePipe implements PipeTransform {
    public transform<ValueType = Any>(values: ValueType[], path: string = ''): ValueType[] {
        return uniqueArrayOf(values, path);
    }
}
