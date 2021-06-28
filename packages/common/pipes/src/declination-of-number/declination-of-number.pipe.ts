import { Pipe, PipeTransform } from '@angular/core';
import { declinationOfNumber } from '@angular-ru/common/utils';

@Pipe({ name: 'declinationOfNumber' })
export class DeclinationOfNumberPipe implements PipeTransform {
    public transform: typeof declinationOfNumber = declinationOfNumber;
}
