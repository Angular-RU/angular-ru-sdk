import {ExpectFractionHelper} from './expect-fraction-helper';
import {FractionSeparator} from './fraction-separator';

export function getFractionSeparator(lang: string): FractionSeparator {
    const fractionSample: ExpectFractionHelper = {
        expectedValue: 1000000.65,
        lastValuePositionBeforeFraction: -3,
    };

    return fractionSample.expectedValue
        .toLocaleString(lang)
        .slice(fractionSample.lastValuePositionBeforeFraction)
        .slice(0, 1) as FractionSeparator;
}
