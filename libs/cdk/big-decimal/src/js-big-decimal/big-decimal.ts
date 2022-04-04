import { Any } from '@angular-ru/cdk/typings';
import { checkEveryValueIsEmpty, checkSomeValueIsEmpty, checkValueIsFilled } from '@angular-ru/cdk/utils';

import { add, trim } from './add';
import { compareTo } from './compare-to';
import { divide } from './divide';
import { modulus } from './modulus';
import { multiply } from './multiply';
import { CompareResult, DEFAULT_DIGITS, EXPONENTIAL_PARTS_LENGTH } from './properties';
import { roundOff } from './round';
import { RoundingModes } from './rounding-modes';
import { negate, subtract } from './subtract';
import { PrettyParams } from './types';

export class BigDecimal {
    private readonly value: string;

    constructor(num: number | string = '0') {
        this.value = BigDecimal.validate(num);
    }

    public static negate(inputNum: Any): string {
        const num: string = BigDecimal.validate(inputNum);

        return negate(num);
    }

    public static ceil(inputNum: Any): Any {
        const num: string = BigDecimal.validate(inputNum);

        if (num.indexOf('.') === -1) {
            return num;
        }

        return BigDecimal.round(num, 0, RoundingModes.CEILING);
    }

    public static add(inputA: Any, inputB?: Any): string {
        const a: string = BigDecimal.validate(inputA);
        const b: string = BigDecimal.validate(inputB);

        return add(a, b);
    }

    public static subtract(inputA: Any, inputB: Any): string {
        const a: string = BigDecimal.validate(inputA);
        const b: string = BigDecimal.validate(inputB);

        return subtract(a, b);
    }

    public static multiply(inputA: Any, inputB: Any): string {
        const a: string = BigDecimal.validate(inputA);
        const b: string = BigDecimal.validate(inputB);

        return multiply(a, b);
    }

    public static divide(inputA: Any, inputB: Any, precision?: Any): string {
        const a: string = BigDecimal.validate(inputA);
        const b: string = BigDecimal.validate(inputB);

        return divide(a, b, precision);
    }

    public static modulus(inputA: Any, inputB: Any): string {
        const a: string = BigDecimal.validate(inputA);
        const b: string = BigDecimal.validate(inputB);

        return modulus(a, b);
    }

    public static compareTo(inputA: Any, inputB: Any): CompareResult {
        const a: string = BigDecimal.validate(inputA);
        const b: string = BigDecimal.validate(inputB);

        return compareTo(a, b);
    }

    public static round(inputA: Any, precision: Any = 0, mode: RoundingModes = RoundingModes.HALF_EVEN): Any {
        const a: string = BigDecimal.validate(inputA);

        if (isNaN(precision)) {
            throw new Error(`Precision is not a num: ${precision}`);
        }

        return roundOff(a, precision, mode);
    }

    public static floor(inputA: Any): Any {
        const a: string = BigDecimal.validate(inputA);

        if (a.indexOf('.') === -1) {
            return a;
        }

        return BigDecimal.round(a, 0, RoundingModes.FLOOR);
    }

    public static getPrettyValue(inputNum: Any, digits?: Any, separator?: Any): string {
        let num: Any = inputNum;

        const prettyParams: PrettyParams = validatePrettyParams({ digits, separator });

        num = BigDecimal.validate(num);
        const neg: boolean = num.charAt(0) === '-';

        if (neg) {
            num = num.substring(1);
        }

        let numLength: number = num.indexOf('.');

        numLength = numLength > 0 ? numLength : num.length;
        const temp: string = getTemp(prettyParams, numLength, num);

        return (neg ? '-' : '') + temp + num.substring(numLength);
    }

    private static validate(inputNum: Any): string {
        let num: Any = prepareNum(inputNum);

        const isPoint: boolean = num.startsWith('.');
        const isDashPoint: boolean = num.startsWith('-.');

        if (isPoint) {
            num = `0${num}`;
        } else if (isDashPoint) {
            num = `-0${num.substr(1)}`;
        }

        if (/e/i.test(num)) {
            num = getExponentiation(num);
        }

        return num;
    }

    public getValue(): string {
        return this.value;
    }

    public getPrettyValue(digits?: Any, separator?: Any): string {
        return BigDecimal.getPrettyValue(this.value, digits, separator);
    }

    public round(precision: number = 0, mode: RoundingModes = RoundingModes.HALF_EVEN): BigDecimal {
        if (isNaN(precision)) {
            throw new Error(`Precision is not a num: ${precision}`);
        }

        return new BigDecimal(roundOff(this.value, precision, mode));
    }

    public floor(): BigDecimal {
        if (this.value.indexOf('.') === -1) {
            return new BigDecimal(this.value);
        }

        return new BigDecimal(this.value).round(0, RoundingModes.FLOOR);
    }

    public ceil(): BigDecimal {
        if (this.value.indexOf('.') === -1) {
            return new BigDecimal(this.value);
        }

        return new BigDecimal(this.value).round(0, RoundingModes.CEILING);
    }

    public add(num: BigDecimal): BigDecimal {
        return new BigDecimal(add(this.value, num.getValue()));
    }

    public subtract(num: BigDecimal): BigDecimal {
        return new BigDecimal(subtract(this.value, num.getValue()));
    }

    public multiply(num: BigDecimal): BigDecimal {
        return new BigDecimal(multiply(this.value, num.getValue()));
    }

    public divide(num: BigDecimal, precision: Any): BigDecimal {
        return new BigDecimal(divide(this.value, num.getValue(), precision));
    }

    public modulus(num: BigDecimal): BigDecimal {
        return new BigDecimal(modulus(this.value, num.getValue()));
    }

    public compareTo(num: BigDecimal): CompareResult {
        return compareTo(this.value, num.getValue());
    }

    public negate(): BigDecimal {
        return new BigDecimal(negate(this.value));
    }
}

function validatePrettyParams(params: PrettyParams): PrettyParams {
    const result: PrettyParams = { ...params };

    if (checkEveryValueIsEmpty(params.digits, params.separator)) {
        result.digits = DEFAULT_DIGITS;
        result.separator = ',';
    } else if (checkSomeValueIsEmpty(params.digits, params.separator)) {
        throw new Error('Illegal Arguments. Should pass both digits and separator or pass none');
    }

    return result;
}

function getTemp(params: PrettyParams, length_: number, num: Any): string {
    let temp: string = '';

    for (let i: number = length_; i > 0; ) {
        if (i < params.digits) {
            params.digits = i;
            i = 0;
        } else {
            i -= params.digits;
        }

        temp =
            num.substring(i, i + params.digits) +
            (i < length_ - params.digits && i >= 0 ? params.separator : '') +
            temp;
    }

    return temp;
}

function getExponentiation(inputNum: string): string {
    const numParts: string[] = inputNum.split(/[Ee]/);

    if (numParts.length !== EXPONENTIAL_PARTS_LENGTH) {
        return inputNum;
    }

    let mantisa: Any = trim(numParts[0] ?? '');
    let exponent: Any = numParts[1] ?? '';
    let offset: number = 0;

    if (mantisa.indexOf('.') >= 0) {
        exponent = parseInt(exponent) + mantisa.indexOf('.');
        mantisa = mantisa.replace('.', '');
        offset = 1;
    }

    return prepareExponentiation(mantisa, exponent, offset);
}

function prepareExponentiation(mantisa: Any, exponent: Any, offset: number): string {
    let num: string = '';

    if (mantisa.length < exponent) {
        num = mantisa + Array.from({ length: exponent - mantisa.length + 1 }).join('0');
    } else if (mantisa.length >= exponent && exponent > 0) {
        num =
            trim(mantisa.substring(0, exponent)) + (mantisa.length > exponent ? `.${mantisa.substring(exponent)}` : '');
    } else {
        num = `0.${new Array(-exponent + offset).join('0')}${mantisa}`;
    }

    return num;
}

function prepareNum(inputNum: Any): Any {
    let num: Any = inputNum;

    if (checkValueIsFilled(inputNum)) {
        num = inputNum.toString();

        if (isNaN(num)) {
            throw new Error(`Parameter is not a num: ${num}`);
        }

        if (num[0] === '+') {
            num = num.substring(1);
        }
    } else {
        num = '0';
    }

    return num;
}
