import {Nullable} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

import {toNumber} from '../to-number';
import {NumberFormatOptions} from './number-format-options';

export function numberFormat(
    value?: Nullable<number | string>,
    options?: NumberFormatOptions,
): string {
    const fallback: string = options?.fallback ?? '';
    const locales: string[] | string = options?.locales ?? 'ru-RU';
    const numberValue: number = isNil(value) ? NaN : toNumber(value);

    return (
        isNaN(numberValue)
            ? fallback
            : numberValue.toLocaleString(locales, options?.formatOptions ?? {})
    ).replaceAll(/\s/g, ' ');
}
