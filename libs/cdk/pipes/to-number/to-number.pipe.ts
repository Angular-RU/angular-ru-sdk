import {Pipe, PipeTransform} from '@angular/core';
import {toNumber} from '@angular-ru/cdk/number';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({name: 'toNumber'})
export class ToNumberPipe implements PipeTransform {
    public transform(value: Nullable<number | string>, locale = 'ru-RU'): number {
        return toNumber(value, locale);
    }
}
