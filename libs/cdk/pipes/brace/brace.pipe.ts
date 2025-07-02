import {Pipe, PipeTransform} from '@angular/core';

@Pipe({standalone: false, name: 'brace'})
export class BracePipe implements PipeTransform {
    public transform(value: number | string): string {
        return `(${value})`;
    }
}
