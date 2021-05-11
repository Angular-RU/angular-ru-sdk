import { Pipe, PipeTransform } from '@angular/core';
import { toNumber } from '@angular-ru/common/number';

@Pipe({ name: 'toNumber' })
export class ToNumberPipe implements PipeTransform {
    public transform: typeof toNumber = toNumber;
}
