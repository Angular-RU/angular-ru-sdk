import { Pipe, PipeTransform } from '@angular/core';
import { getNameByPath } from '@angular-ru/common/object';

@Pipe({ name: 'nameByPath' })
export class NameByPathPipe implements PipeTransform {
    public transform<T>(item: T, displayKey?: keyof T): string {
        return getNameByPath<T>(item, displayKey);
    }
}
