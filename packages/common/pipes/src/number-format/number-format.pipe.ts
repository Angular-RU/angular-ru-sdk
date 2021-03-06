import { Pipe, PipeTransform } from '@angular/core';
import { numberFormat } from '@angular-ru/common/number';

@Pipe({ name: 'numberFormat' })
export class NumberFormatPipe implements PipeTransform {
    public transform: typeof numberFormat = numberFormat;
}
