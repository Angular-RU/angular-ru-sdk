import { REG_EXP_NUMBER } from '@angular-ru/cdk/regexp';

import { UnitsMap } from './types';

const NUMBER_PATTERN: string = new RegExp(REG_EXP_NUMBER.source.replace('^', '').replace('$', '')).source;

export function replaceUnits(text: string, unitsMap: UnitsMap): string {
    return parseMultiLineText(text, unitsMap);
}

function parseMultiLineText(text: string, unitsMap: UnitsMap): string {
    const textList: string[] = [];

    text.split('\n').forEach((item: string): void => {
        let prepared: string = item;

        prepared = replaceMultiple(prepared, unitsMap);
        prepared = replaceSingle(prepared, unitsMap);
        textList.push(prepared);
    });

    return textList.join('\n');
}

function replaceMultiple(value: string, unitsMap: UnitsMap): string {
    const pattern: RegExp = getMultipleUnitsPattern(unitsMap);

    let text: string = value;

    while (pattern.test(text)) {
        text = replaceByMatch(text, pattern, unitsMap);
    }

    return text;
}

function replaceSingle(value: string, unitsMap: UnitsMap): string {
    const pattern: RegExp = getSingleUnitPattern(unitsMap);

    let text: string = value;

    while (pattern.test(text)) {
        text = replaceByMatch(text, pattern, unitsMap);
    }

    return text;
}

function replaceByMatch(text: string, pattern: RegExp, unitsMap: UnitsMap): string {
    const match: string = pattern.exec(text)?.[0] ?? '';
    const num: number = convertToNumber(match, unitsMap);
    const prepared: string = match.replace(RegExp(/\S.*\S/), num.toString());

    return text.replace(pattern, prepared);
}

function convertToNumber(text: string, unitsMap: UnitsMap): number {
    const units: string = text.trim();
    const sum: number = units
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

function getMultipleUnitsPattern(unitsMap: UnitsMap): RegExp {
    const unitKeys: string = getUnitKeys(unitsMap);

    return new RegExp(`(^|\\s)((${NUMBER_PATTERN})(${unitKeys}))(\\s+((${NUMBER_PATTERN})(${unitKeys})))+(\\s|$)`);
}

function getSingleUnitPattern(unitsMap: UnitsMap): RegExp {
    const unitKeys: string = getUnitKeys(unitsMap);

    return new RegExp(`(^|\\s)(${NUMBER_PATTERN})(${unitKeys})(\\s|$)`);
}

function getCoefficient(unit: string): number {
    const prefix: string = unit.match(`^${NUMBER_PATTERN}`)?.[0] ?? '';
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
