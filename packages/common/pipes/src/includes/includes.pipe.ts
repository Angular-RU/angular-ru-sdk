import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'includes' })
export class IncludesPipe implements PipeTransform {
    public transform<T>(array: T[] | null | undefined, entry: T): boolean {
        if (array) {
            return array.includes(entry);
        } else {
            return false;
        }
    }
}
