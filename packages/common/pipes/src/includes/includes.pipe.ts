import { Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '@angular-ru/common/typings';
@Pipe({ name: 'includes' })
export class IncludesPipe implements PipeTransform {
    public transform<T>(array: Nullable<T[]>, entry: T): boolean {
        return array?.includes(entry) ?? false;
    }
}
