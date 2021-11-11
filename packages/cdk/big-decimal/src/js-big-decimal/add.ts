/* eslint-disable */
import { Any } from '@angular-ru/cdk/typings';
import { checkValueIsEmpty, isNil } from '@angular-ru/cdk/utils';

import { NUMBER_SYSTEM } from './properties';
import { CalculateResult } from './types';

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
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        ind = 2;
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
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    } else if (neg === 2) {
        return `-${trim(res)}`;
    } else {
        if (a.length < res.length) {
            return trim(res.substring(1));
        } else {
            return `-${trim(compliment(res))}`;
        }
    }
}

function compliment(number: string) {
    let s = '';
    const l = number.length;
    const dec = number.split('.')[1];
    const ld = dec ? dec.length : 0;

    for (let i = 0; i < l; i++) {
        if ((number[i] ?? '') >= '0' && (number[i] ?? '') <= '9') {
            s += 9 - parseInt(number[i] ?? '');
        } else {
            s += number[i];
        }
    }

    const one = ld > 0 ? `0.${new Array(ld).join('0')}1` : '1';

    return addCore(s, one);
}

export function trim(number: string): string {
    const splited: string[] = number.split('.') ?? [];
    const parts: string[] = removeZerosAtTheBegining(splited);

    if (isNil(parts[1])) {
        return parts[0] ?? '';
    } else {
        return `${parts[0]}.${parts[1]}`;
    }
}

export function pad(inputA: Any, inputB: Any): [string, string] {
    const partsA = inputA.split('.');
    const partsB = inputB.split('.');

    // pad integral part
    let length1 = partsA[0].length;
    let length2 = partsB[0].length;

    if (length1 > length2) {
        partsB[0] = new Array(Math.abs(length1 - length2) + 1).join('0') + (partsB[0] ? partsB[0] : '');
    } else {
        partsA[0] = new Array(Math.abs(length1 - length2) + 1).join('0') + (partsA[0] ? partsA[0] : '');
    }

    // pad fractional part
    length1 = partsA[1] ? partsA[1].length : 0;
    length2 = partsB[1] ? partsB[1].length : 0;

    if (length1 || length2) {
        if (length1 > length2) {
            partsB[1] = (partsB[1] ? partsB[1] : '') + new Array(Math.abs(length1 - length2) + 1).join('0');
        } else {
            partsA[1] = (partsA[1] ? partsA[1] : '') + new Array(Math.abs(length1 - length2) + 1).join('0');
        }
    }

    const a: string = partsA[0] + (partsA[1] ? `.${partsA[1]}` : '');
    const b: string = partsB[0] + (partsB[1] ? `.${partsB[1]}` : '');

    return [a, b];
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
