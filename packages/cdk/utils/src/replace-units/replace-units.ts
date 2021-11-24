import { Nullable } from '@angular-ru/cdk/typings';

import { isNil } from '../is-nil';
import { isNotNil } from '../is-not-nil';
import { UnitsMap } from './types';

const REGEXP_NUMBER: string = `[0-9]+([\.][0-9]+)?`;

export function replaceUnits(text: string, unitsMap: UnitsMap): string {
    let result: string = text;

    result = replaceMultiple(result, unitsMap);
    result = replaceSingle(result, unitsMap);

    return result;
}

function replaceMultiple(value: string, unitsMap: UnitsMap): string {
    const unitKeys: string = getUnitKeys(unitsMap);
    const pattern: RegExp = new RegExp(
        `(^|\\s)((${REGEXP_NUMBER})(${unitKeys}))(\\s+((${REGEXP_NUMBER})(${unitKeys})))+(\\s|$)`
    );

    let result: string = value;
    let match: Nullable<string> = null;

    while (pattern.test(result)) {
        match = pattern.exec(result)?.[0] ?? '';
        const num: Nullable<number> = convertToNumberMultiple(match, unitsMap);
        const unitValue: string = isNil(num) ? '' : num.toString();
        const prepared: string = match.replace(RegExp(/\S.*\S/), unitValue);

        result = result.replace(pattern, prepared);
    }

    return result;
}

function convertToNumberMultiple(inputUnit: string, unitsMap: UnitsMap): Nullable<number> {
    const unit: string = inputUnit.trim();
    const sum: number = unit
        .split(' ')
        .filter((item: string): boolean => item !== '')
        .map((item: string): number => {
            const coefficient: number = getCoefficient(item);
            const unitValue: number = getUnitValue(item, unitsMap);

            return coefficient * unitValue;
        })
        .reduce((accumulator: number, item: number): number => accumulator + item, 0);

    return sum;
}

function replaceSingle(value: string, unitsMap: UnitsMap): string {
    const unitKeys: string = getUnitKeys(unitsMap);
    const pattern: RegExp = new RegExp(`(^|\\s)(${REGEXP_NUMBER})(${unitKeys})(\\s|$)`);

    let result: string = value;
    let match: Nullable<string> = null;

    while (pattern.test(result)) {
        match = pattern.exec(result)?.[0] ?? '';
        const num: Nullable<number> = convertToNumberSingle(match, unitsMap);
        const unitValue: string = isNil(num) ? '' : num.toString();
        const prepared: string = match.replace(RegExp(/\S.*\S/), unitValue);

        result = result.replace(pattern, prepared);
    }

    return result;
}

function convertToNumberSingle(inputUnit: string, unitsMap: UnitsMap): Nullable<number> {
    const unit: string = inputUnit.trim();

    if (isValidMatch(unit, unitsMap)) {
        const coefficient: number = getCoefficient(unit);
        const unitValue: number = getUnitValue(unit, unitsMap);

        return coefficient * unitValue;
    } else {
        return null;
    }
}

function isValidMatch(unit: string, unitsMap: UnitsMap): boolean {
    const unitKeys: string = getUnitKeys(unitsMap);
    const pattern: RegExp = RegExp(`^${REGEXP_NUMBER}(${unitKeys})$`);

    return isNotNil(unit.match(pattern));
}

function getCoefficient(unit: string): number {
    const prefix: string = unit.match(`^${REGEXP_NUMBER}`)?.[0] ?? '';

    const result: number = prefix.includes('.') ? parseFloat(prefix) : parseInt(prefix);

    return result;
}

function getUnitValue(unit: string, unitsMap: UnitsMap): number {
    const postfix: string = unit.match(/[^0-9]+$/s)?.[0] ?? '';

    return unitsMap[postfix] ?? 0;
}

function getUnitKeys(unitsMap: UnitsMap): string {
    return Object.keys(unitsMap)
        .map((item: string): string => (item.length > 1 ? `(${item})` : item))
        .join('|');
}
