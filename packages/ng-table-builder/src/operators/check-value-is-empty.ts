import { Any } from '@angular-ru/common/typings';

export function checkValueIsEmpty(value: Any): boolean {
    if (typeof value === 'number') {
        return isNaN(value) || value === Infinity;
    } else if (typeof value === 'string') {
        return value.trim().length === 0;
    } else {
        return typeof value === 'boolean' ? false : !value;
    }
}
