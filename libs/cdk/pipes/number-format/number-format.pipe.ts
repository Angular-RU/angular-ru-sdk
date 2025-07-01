import {Pipe, PipeTransform} from '@angular/core';
import {numberFormat, NumberFormatOptions} from '@angular-ru/cdk/number';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({standalone: false, name: 'numberFormat'})
export class NumberFormatPipe implements PipeTransform {
    public transform(
        value?: Nullable<number | string>,
        options?: NumberFormatOptions,
    ): string {
        return numberFormat(value, options);
    }
}
