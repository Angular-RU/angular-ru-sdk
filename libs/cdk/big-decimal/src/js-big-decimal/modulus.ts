import { divide } from './divide';
import { multiply } from './multiply';
import { roundOff } from './round';
import { RoundingModes } from './rounding-modes';
import { subtract } from './subtract';

export function modulus(inputDividend: number | string, inputDivisor: number | string): string {
    validateDividend(inputDividend);

    let dividend: string = inputDividend.toString();
    let divisor: string = inputDivisor.toString();

    validate(dividend);
    validate(divisor);

    let sign: string = '';

    if (dividend[0] === '-') {
        sign = '-';
        // eslint-disable-next-line deprecation/deprecation
        dividend = dividend.substr(1);
    }

    if (divisor[0] === '-') {
        // eslint-disable-next-line deprecation/deprecation
        divisor = divisor.substr(1);
    }

    const result: string = subtract(
        dividend,
        multiply(divisor, roundOff(divide(dividend, divisor), 0, RoundingModes.FLOOR))
    );

    return sign + result;
}

function validate(operand: string): void {
    if (operand.indexOf('.') !== -1) {
        throw new Error('Modulus of non-integers not supported');
    }
}

function validateDividend(dividend: number | string): void {
    if (dividend === 0 || dividend === '0') {
        throw new Error('Cannot divide by 0');
    }
}
