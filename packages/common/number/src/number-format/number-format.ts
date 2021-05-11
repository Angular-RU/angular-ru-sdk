import { isNil } from '@angular-ru/common/utils';

import { toNumber } from '../to-number';
import { NumberFormatOptions } from './number-format-options';

export function numberFormat(value?: string | number | undefined | null, options?: NumberFormatOptions): string {
    const fallback: string = options?.fallback ?? '';
    const locales: string | string[] = options?.locales ?? 'ru-RU';
    const numberValue: number = isNil(value) ? NaN : toNumber(value);

    return (isNaN(numberValue) ? fallback : numberValue.toLocaleString(locales, options?.formatOptions)).replace(
        /\s/g,
        ' '
    );
}
