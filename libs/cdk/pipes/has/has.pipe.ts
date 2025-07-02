import {Pipe, PipeTransform} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({standalone: false, name: 'has'})
export class HasPipe implements PipeTransform {
    public transform<T>(set: Nullable<Set<T>>, entry: T): boolean {
        return set?.has(entry) ?? false;
    }
}
