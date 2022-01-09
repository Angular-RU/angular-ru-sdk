import { Pipe, PipeTransform } from '@angular/core';
import { Any } from '@angular-ru/cdk/typings';

@Pipe({ name: 'isArray' })
export class IsArrayPipe implements PipeTransform {
    public transform(value: Any): boolean {
        return Array.isArray(value);
    }
}
