import { Any } from '@angular-ru/common/typings';

export function isNumber(value: Any): value is number {
    return typeof value === 'number';
}
