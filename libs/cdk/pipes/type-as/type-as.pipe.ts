import {Pipe, PipeTransform} from '@angular/core';

@Pipe({standalone: false, name: 'typeAs'})
export class TypeAsPipe implements PipeTransform {
    public transform<T, K = any>(
        value: K | T | unknown | null | undefined,
        _typedValue: T,
    ): T {
        return value as T;
    }
}
