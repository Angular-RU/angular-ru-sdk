import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'includes' })
export class IncludesPipe implements PipeTransform {
    public transform<T>(array: T[] | null | undefined, entry: T): boolean {
        return array?.includes(entry) ?? false;
    }
}
