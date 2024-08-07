import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'isArray'})
export class IsArrayPipe implements PipeTransform {
    public transform<T>(value: T): boolean {
        return Array.isArray(value);
    }
}
