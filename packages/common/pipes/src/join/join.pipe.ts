import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join' })
export class JoinPipe implements PipeTransform {
    public transform(input: unknown[], separator: string = ', '): string {
        return input.join(separator);
    }
}
