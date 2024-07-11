import {checkValueIsEmpty} from '@angular-ru/cdk/utils';

import {add, trim} from './add';
import {DEFAULT_PRECISSION, PRECISSION_SECOND} from './properties';
import {roundOff} from './round';

// eslint-disable-next-line max-lines-per-function,complexity,sonarjs/cognitive-complexity
export function divide(
    inputDividend: number | string,
    inputDivisor: number | string,
    inputPrecision: number = DEFAULT_PRECISSION,
): string {
    checkDivisionByZero(inputDivisor);

    let dividend: string = inputDividend.toString();
    let divisor: string = inputDivisor.toString();

    dividend = removeTrailingZeros(dividend);
    divisor = removeTrailingZeros(divisor);

    if (dividend === '0') {
        return '0';
    }

    const isNegative: boolean = checkNegative(divisor, dividend);

    divisor = getAbsoluteValue(divisor);
    dividend = getAbsoluteValue(dividend);
    dividend = parseDividend(dividend, divisor);

    divisor = trim(divisor.replace('.', ''));
    const dl: number = divisor.length;
    let precission = 0;
    let quotient = '';
    let dividendBeforePoint: string =
        dividend.includes('.') && dividend.indexOf('.') < dl
            ? dividend.slice(0, Math.max(0, dl + 1))
            : dividend.slice(0, Math.max(0, dl));

    dividend =
        dividend.includes('.') && dividend.indexOf('.') < dl
            ? dividend.slice(Math.max(0, dl + 1))
            : dividend.slice(Math.max(0, dl));

    if (dividendBeforePoint.includes('.')) {
        let shift: number =
            dividendBeforePoint.length - dividendBeforePoint.indexOf('.') - 1;

        dividendBeforePoint = dividendBeforePoint.replace('.', '');

        if (dl > dividendBeforePoint.length) {
            shift += dl - dividendBeforePoint.length;
            dividendBeforePoint += new Array(dl - dividendBeforePoint.length + 1).join(
                '0',
            );
        }

        precission = shift;
        quotient = `0.${new Array(shift).join('0')}`;
    }

    while (precission <= inputPrecision + PRECISSION_SECOND) {
        let qt = 0;

        while (parseInt(dividendBeforePoint) >= parseInt(divisor)) {
            dividendBeforePoint = add(dividendBeforePoint, `-${divisor}`);
            qt++;
        }

        quotient += qt;
        const isDividendEmpty: boolean = checkValueIsEmpty(dividend);

        if (isDividendEmpty) {
            if (!precission) {
                quotient += '.';
            }

            precission++;
            dividendBeforePoint = `${dividendBeforePoint}0`;
        } else {
            if (dividend.startsWith('.')) {
                quotient += '.';
                precission++;
                dividend = dividend.slice(1);
            }

            dividendBeforePoint += dividend.slice(0, 1);
            dividend = dividend.slice(1);
        }
    }

    return (isNegative ? '-' : '') + trim(roundOff(quotient, inputPrecision));
}

function parseDividend(inputDividend: string, divisor: string): string {
    let dividend: string = inputDividend;
    const ptDivisor: number =
        divisor.indexOf('.') > 0 ? divisor.length - divisor.indexOf('.') - 1 : -1;

    if (ptDivisor >= 0) {
        dividend = parseDividendByPositiveDividend(dividend, ptDivisor);
    }

    return dividend;
}

function parseDividendByPositiveDividend(
    inputDividend: string,
    ptDivisor: number,
): string {
    let dividend: string = inputDividend;
    const ptDividend: number =
        dividend.indexOf('.') > 0 ? dividend.length - dividend.indexOf('.') - 1 : -1;

    if (ptDividend === -1) {
        dividend = trim(dividend + new Array(ptDivisor + 1).join('0'));
    } else if (ptDivisor > ptDividend) {
        dividend = dividend.replace('.', '');
        dividend = trim(dividend + new Array(ptDivisor - ptDividend + 1).join('0'));
    } else if (ptDivisor < ptDividend) {
        dividend = dividend.replace('.', '');
        const i: number = dividend.length - ptDividend + ptDivisor;

        dividend = trim(
            `${dividend.slice(0, Math.max(0, i))}.${dividend.slice(Math.max(0, i))}`,
        );
    } else if (ptDivisor === ptDividend) {
        dividend = trim(dividend.replace('.', ''));
    }

    return dividend;
}

function removeTrailingZeros(value: string): string {
    return value.replaceAll(/(\.\d*?[1-9])0+$/g, '$1').replace(/\.0+$/, '');
}

function checkDivisionByZero(divisor: any): void {
    if (divisor === 0 || divisor === '0') {
        throw new Error('Cannot divide by 0');
    }
}

function checkNegative(divisor: string, dividend: string): boolean {
    let isNegative = false;

    if (divisor.startsWith('-')) {
        isNegative = !isNegative;
    }

    if (dividend.startsWith('-')) {
        isNegative = !isNegative;
    }

    return isNegative;
}

function getAbsoluteValue(value: string): string {
    return value.startsWith('-') ? value.slice(1) : value;
}
