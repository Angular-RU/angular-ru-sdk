import { Pipe, PipeTransform } from '@angular/core';
import { uniqueArrayOf } from '@angular-ru/cdk/array';
import { Any } from '@angular-ru/cdk/typings';

@Pipe({ name: 'filterUnique' })
export class FilterUniquePipe implements PipeTransform {
    public transform<ValueType = Any>(values: ValueType[], path: string = ''): ValueType[] {
        return uniqueArrayOf(values, path);
    }
}
