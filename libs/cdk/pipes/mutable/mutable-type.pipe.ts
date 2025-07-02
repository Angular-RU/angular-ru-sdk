import {Pipe, PipeTransform} from '@angular/core';
import {Immutable, Mutable, Nullable} from '@angular-ru/cdk/typings';

@Pipe({standalone: false, name: 'mutable'})
export class MutableTypePipe implements PipeTransform {
    public transform<T>(value: Nullable<Immutable<T>>): Mutable<T>;
    public transform<T>(value: Nullable<T>): T;
    public transform<T>(value: Nullable<Immutable<T> | T>): T {
        return value as T;
    }
}
