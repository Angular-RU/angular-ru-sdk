import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'entrySingleSet' })
export class EntrySingleSetPipe implements PipeTransform {
    public transform(key: string, listKeys?: Set<string>): boolean {
        return !!listKeys?.has(key);
    }
}
