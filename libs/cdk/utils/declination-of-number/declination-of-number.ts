/* eslint-disable @typescript-eslint/no-magic-numbers */
import {Nullable} from '@angular-ru/cdk/typings';

import {DeclinationAssociativeMap, DeclinationDictionary} from './declination-dictionary';

const associative: DeclinationAssociativeMap = {
    unitIndex: 0,
    pairIndex: 1,
    multipleIndex: 2,
};

/**
 * @description: We pass this function a number, and an array of headers,
 * among which the correct form will be chosen to match the number.
 * The first element of the directory is for units, the second is for pairs,
 * and the third is for other numbers.
 *
 *
 * The declination depends on the last digit of the number.
 * Second: 1.
 * Seconds: 0, 5, 6, 7, 8, 9.
 * Seconds: 2, 3, 4.
 *
 * Given the ranges used, the last digit can be obtained as a remainder of division by 10.
 *
 * @param numberValue example as 1
 * @param dictionary example as ["арбуз", "арбуза", "арбузов"]
 * @return Nullable<string> as "арбуз"
 */
export function declinationOfNumber(
    numberValue: number,
    dictionary: DeclinationDictionary,
): Nullable<string> {
    const remainder: number = Math.abs(numberValue) % 100;
    let result: Nullable<string>;

    if (isMultipleDeclination(remainder)) {
        result = dictionary[associative.multipleIndex];
    } else if (isPairDeclination(remainder)) {
        result = dictionary[associative.pairIndex];
    } else if (isUnitDeclination(remainder)) {
        result = dictionary[associative.unitIndex];
    } else {
        result = dictionary[associative.multipleIndex];
    }

    return result;
}

function isMultipleDeclination(remainder: number): boolean {
    return remainder > 10 && remainder < 20;
}

function isPairDeclination(remainder: number): boolean {
    return remainder % 10 > 1 && remainder % 10 < 5;
}

function isUnitDeclination(remainder: number): boolean {
    return remainder % 10 === 1;
}
