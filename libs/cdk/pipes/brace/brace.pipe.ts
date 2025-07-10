import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'brace'})
export class BracePipe implements PipeTransform {
    public transform(value: number | string): string {
        return `(${value})`;
    }
}
