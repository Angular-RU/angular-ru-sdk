import { Any } from '@angular-ru/cdk/typings';
import { checkValueIsEmpty, checkValueIsFilled, isNil } from '@angular-ru/cdk/utils';

import { EXPONENTIAL_PARTS_LENGTH, NUMBER_SYSTEM } from './properties';
import { CalculateResult } from './types';

export function trim(number: string): string {
    const splited: string[] = number.split('.') ?? [];
    const parts: string[] = removeZerosAtTheBegining(splited);

    if (isNil(parts[1])) {
        return parts[0] ?? '';
    } else {
        return `${parts[0]}.${parts[1]}`;
    }
}

// eslint-disable-next-line max-lines-per-function, complexity
export function add(inputA: Any, inputB: Any = '0'): string {
    let a: Any = inputA;
    let b: Any = inputB;
    let neg: number = 0;
    let ind: number = -1;

    // check for negatives
    if (inputA[0] === '-') {
        neg++;
        ind = 1;
        a = inputA.substring(1);
    }

    if (inputB[0] === '-') {
        neg++;
        ind = EXPONENTIAL_PARTS_LENGTH;
        b = inputB.substring(1);
    }

    const padResult: string[] = pad(trim(a), trim(b));

    a = padResult[0];
    b = padResult[1];

    if (neg === 1) {
        if (ind === 1) {
            a = compliment(a);
        } else {
            b = compliment(b);
        }
    }

    const res: string = addCore(a, b);

    if (!neg) {
        return trim(res);
    } else if (neg === EXPONENTIAL_PARTS_LENGTH) {
        return `-${trim(res)}`;
    } else {
        if (a.length < res.length) {
            return trim(res.substring(1));
        } else {
            return `-${trim(compliment(res))}`;
        }
    }
}

// eslint-disable-next-line max-lines-per-function, complexity
export function pad(inputA: Any, inputB: Any): [string, string] {
    const partsA: string[] = inputA.split('.');
    const partsB: string[] = inputB.split('.');

    // pad integral part
    let length1: number = partsA[0]?.length ?? 0;
    let length2: number = partsB[0]?.length ?? 0;

    let larger: number = Math.abs(length1 - length2);

    if (length1 > length2) {
        partsB[0] = getIntegralPart(partsB, larger);
    } else {
        partsA[0] = getIntegralPart(partsA, larger);
    }

    // pad fractional part
    length1 = checkValueIsFilled(partsA[1]) ? partsA[1].length : 0;
    length2 = checkValueIsFilled(partsB[1]) ? partsB[1].length : 0;

    larger = Math.abs(length1 - length2);

    if (length1 || length2) {
        if (length1 > length2) {
            partsB[1] = getFractionalPart(partsB, larger);
        } else {
            partsA[1] = getFractionalPart(partsA, larger);
        }
    }

    const a: string = getPadFormat(partsA);
    const b: string = getPadFormat(partsB);

    return [a, b];
}

function compliment(num: string): string {
    let s: string = '';
    const dec: Any = num.split('.')[1];
    const ld: number = checkValueIsFilled(dec) ? dec.length : 0;

    for (let i: number = 0; i < num.length; i++) {
        s += getPreparedDigit(num[i] ?? '');
    }

    const one: string = ld > 0 ? `0.${new Array(ld).join('0')}1` : '1';

    return addCore(s, one);
}

function getPreparedDigit(char: string): number | string {
    const isDigit: boolean = char >= '0' && char <= '9';

    if (isDigit) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return 9 - parseInt(char);
    } else {
        return char;
    }
}

function getIntegralPart(parts: string[], larger: number): string {
    return new Array(larger + 1).join('0') + (checkValueIsFilled(parts[0]) ? parts[0] : '');
}

function getFractionalPart(parts: string[], larger: number): string {
    return (checkValueIsFilled(parts[1]) ? parts[1] : '') + new Array(larger + 1).join('0');
}

function getPadFormat(parts: string[]): string {
    return parts[0] + (checkValueIsFilled(parts[1]) ? `.${parts[1]}` : '');
}

function removeZerosAtTheBegining(parts: string[]): string[] {
    const result: string[] = [...parts];

    if (checkValueIsEmpty(result[0])) {
        result[0] = '0';
    }

    while (result[0][0] === '0' && result[0].length > 1) {
        result[0] = result[0].substring(1);
    }

    return result;
}

function addCore(inputA: string, inputB: string): string {
    const paded: string[] = pad(inputA, inputB);
    const a: string = paded[0] ?? '';
    const b: string = paded[1] ?? '';
    const calculateResult: CalculateResult = calculateCarryAndSum(a, b);

    const sum: string = calculateResult.sum;
    const carry: number = calculateResult.carry;

    return carry ? carry.toString() + sum : sum;
}

function calculateCarryAndSum(a: string, b: string): CalculateResult {
    let sum: string = '';
    let carry: number = 0;

    for (let i: number = a.length - 1; i >= 0; i--) {
        if (a[i] === '.') {
            sum = `.${sum}`;
            continue;
        }

        const temp: number = parseInt(a[i] ?? '') + parseInt(b[i] ?? '') + carry;

        sum = (temp % NUMBER_SYSTEM) + sum;
        carry = Math.floor(temp / NUMBER_SYSTEM);
    }

    return { sum, carry };
}
