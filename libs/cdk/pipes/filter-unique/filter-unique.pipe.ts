import {Pipe, PipeTransform} from '@angular/core';
import {uniqueArrayOf} from '@angular-ru/cdk/array';

@Pipe({name: 'filterUnique'})
export class FilterUniquePipe implements PipeTransform {
    public transform<ValueType = any>(values: ValueType[], path = ''): ValueType[] {
        return uniqueArrayOf(values, path);
    }
}
