import { toNumber } from '@angular-ru/common/number';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toNumber' })
export class ToNumberPipe implements PipeTransform {
    public transform(value: string | number, fallback?: number): number {
        return toNumber(value, fallback);
    }
}
