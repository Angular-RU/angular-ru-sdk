import {Pipe, PipeTransform} from '@angular/core';
import {numberFormat, NumberFormatOptions} from '@angular-ru/cdk/number';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({name: 'numberFormat'})
export class NumberFormatPipe implements PipeTransform {
    public transform(
        value?: Nullable<string | number>,
        options?: NumberFormatOptions,
    ): string {
        return numberFormat(value, options);
    }
}
