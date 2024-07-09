import {Pipe, PipeTransform} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {DeclinationDictionary, declinationOfNumber} from '@angular-ru/cdk/utils';

@Pipe({name: 'declinationOfNumber'})
export class DeclinationOfNumberPipe implements PipeTransform {
    public transform(
        numberValue: number,
        dictionary: DeclinationDictionary,
    ): Nullable<string> {
        return declinationOfNumber(numberValue, dictionary);
    }
}
