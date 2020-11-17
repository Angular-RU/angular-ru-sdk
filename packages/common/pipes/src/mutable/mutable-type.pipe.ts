import { Pipe, PipeTransform } from '@angular/core';
import { Immutable, Mutable } from '@angular-ru/common/typings';

@Pipe({ name: 'mutable' })
export class MutableTypePipe implements PipeTransform {
    public transform<T>(value: Immutable<T> | null): Mutable<T>;
    public transform<T>(value: T | null): T;
    public transform<T>(value: Immutable<T> | T | null): T {
        return (value as Mutable<T>) as T;
    }
}
