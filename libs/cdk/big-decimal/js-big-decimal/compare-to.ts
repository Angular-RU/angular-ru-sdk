import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {pad} from './add';
import {CompareResult} from './properties';

export function compareTo(a: string, b: string): CompareResult {
    const onlyOneNegative: Nullable<CompareResult> = compareIfOnlyOneNegative(a, b);

    if (isNotNil(onlyOneNegative)) {
        return onlyOneNegative;
    }

    const bothNegative: Nullable<CompareResult> = compareIfBothNegative(a, b);

    if (isNotNil(bothNegative)) {
        return bothNegative;
    }

    const bothPositive: Nullable<CompareResult> = compareIfBothPositive(a, b);

    if (isNotNil(bothPositive)) {
        return bothPositive;
    }

    return 0;
}

function compareIfOnlyOneNegative(a: string, b: string): Nullable<CompareResult> {
    let result: Nullable<CompareResult> = null;

    if (a[0] === '-' && b[0] !== '-') {
        result = -1;
    }

    if (a[0] !== '-' && b[0] === '-') {
        result = 1;
    }

    return result;
}

function compareIfBothNegative(inputA: string, inputB: string): Nullable<CompareResult> {
    if (inputA[0] !== '-' || inputB[0] !== '-') {
        return null;
    }

    // eslint-disable-next-line deprecation/deprecation
    const a: string = inputA.substr(1);
    // eslint-disable-next-line deprecation/deprecation
    const b: string = inputB.substr(1);

    const compareModulesResult: CompareResult = compareNumberModules(a, b);

    if (compareModulesResult === 1) {
        return -1;
    }

    if (compareModulesResult === -1) {
        return 1;
    }

    return compareModulesResult;
}

function compareIfBothPositive(a: string, b: string): Nullable<CompareResult> {
    return compareNumberModules(a, b);
}

function compareNumberModules(inputA: string, inputB: string): CompareResult {
    const a: string = pad(inputA, inputB)[0];
    const b: string = pad(inputA, inputB)[1];

    if (a.localeCompare(b) === 0) {
        return 0;
    }

    // eslint-disable-next-line unicorn/no-for-loop
    for (let i: number = 0; i < a.length; i++) {
        const compareDigitsResult: CompareResult = compareDigits(a[i] ?? '', b[i] ?? '');

        if (compareDigitsResult === 0) {
            continue;
        } else {
            return compareDigitsResult;
        }
    }

    return 0;
}

function compareDigits(a: string, b: string): CompareResult {
    if (a === b) {
        return 0;
    }

    if (a > b) {
        return 1;
    }

    return -1;
}
