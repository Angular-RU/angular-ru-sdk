import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isArray' })
export class IsArrayPipe implements PipeTransform {
    public transform(value: any): boolean {
        return Array.isArray(value);
    }
}
