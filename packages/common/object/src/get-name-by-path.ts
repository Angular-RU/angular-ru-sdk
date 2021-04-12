import { Any } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

import { getValueByPath } from './get-value-by-path';
import { isObject } from './is-object';

export function getNameByPath<T>(item: T, displayKey?: keyof T): string {
    if (isObject(item)) {
        return parseObject<T>(item, displayKey);
    } else {
        return parseNotObject<T>(item);
    }
}

function parseObject<T>(item: T, displayKey?: keyof T): string {
    if (Array.isArray(item)) {
        return '';
    }
    if (checkValueIsEmpty(displayKey) || typeof displayKey !== 'string') {
        throw new Error('attribute "displayKey" can not be empty if input item has "object" type');
    }
    const name: Any = getValueByPath<T>(item, displayKey);
    if (typeof name === 'string') {
        return name;
    } else {
        return '';
    }
}

function parseNotObject<T>(item: T): string {
    if (typeof item === 'string') {
        return item;
    }
    return '';
}
