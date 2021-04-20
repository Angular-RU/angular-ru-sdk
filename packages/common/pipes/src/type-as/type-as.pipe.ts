import { Pipe, PipeTransform } from '@angular/core';
import { Any } from '@angular-ru/common/typings';

@Pipe({ name: 'typeAs' })
export class TypeAsPipe implements PipeTransform {
    public transform<T>(value: Any, _typedValue: T): T {
        return value as T;
    }
}
