import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'typeAs' })
export class TypeAsPipe implements PipeTransform {
    public transform<T>(value: any, _typedValue: T): T {
        return value as T;
    }
}
