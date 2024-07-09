import {Nullable} from '@angular-ru/cdk/typings';
import {checkValueIsFilled} from '@angular-ru/cdk/utils';

const formatToPartsValue: number = 12345.6;
const intlFormatOrigin: number = 9876543210;

export function toNumber(
    value: Nullable<number | string>,
    locale: string = 'ru-RU',
): number {
    let prepared: Nullable<string> = value?.toString().replace(/\s/g, '');

    const parts: Intl.NumberFormatPart[] = new Intl.NumberFormat(locale).formatToParts(
        formatToPartsValue,
    );

    const numerals: unknown[] = Array.from(
        new Intl.NumberFormat(locale, {useGrouping: false}).format(intlFormatOrigin),
    ).reverse();

    const group: RegExp = new RegExp(
        `[${parts.find((d: Intl.NumberFormatPart): boolean => d.type === 'group')?.value}]`,
        'g',
    );

    const decimal: RegExp = new RegExp(
        `[${parts.find((d: Intl.NumberFormatPart): boolean => d.type === 'decimal')?.value}]`,
    );

    const numeral: RegExp = new RegExp(`[${numerals.join('')}]`, 'g');

    const indexes = (decimalValue: string): string =>
        new Map(numerals.map((dx: unknown, i: number): [unknown, number] => [dx, i]))
            .get(decimalValue)
            ?.toString() ?? '';

    prepared = prepared
        ?.trim()
        .replace(group, '')
        .replace(decimal, '.')
        .replace(numeral, indexes);

    return checkValueIsFilled(prepared) ? Number(prepared) : NaN;
}
