import { Pipe, PipeTransform } from '@angular/core';
import { Any } from '@angular-ru/common/typings';
import { checkValueIsEmpty, isNil } from '@angular-ru/common/utils';

import { NumberFormatOptions } from './number-format.interfaces';

@Pipe({ name: 'numberFormat' })
export class NumberFormatPipe implements PipeTransform {
    public transform<T = string>(value?: string | number, options?: NumberFormatOptions): T {
        let result: string | undefined | number = value;
        const valid: boolean = !checkValueIsEmpty(value);
        const isNumber: boolean = valid && !isNaN(Number(value));

        if (valid && isNumber) {
            const locale: string = options?.locale ?? 'ru';
            result = isNil(options?.decimalPlaces)
                ? Number(value).toLocaleString(locale)
                : Number(value).toLocaleString(locale, { minimumFractionDigits: options!.decimalPlaces! });
        }

        return (result as Any) as T;
    }
}
