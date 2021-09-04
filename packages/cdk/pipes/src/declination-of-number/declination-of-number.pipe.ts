import { Pipe, PipeTransform } from '@angular/core';
import { declinationOfNumber } from '@angular-ru/cdk/utils';

@Pipe({ name: 'declinationOfNumber' })
export class DeclinationOfNumberPipe implements PipeTransform {
    public transform: typeof declinationOfNumber = declinationOfNumber;
}
