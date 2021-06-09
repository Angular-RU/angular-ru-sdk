import { Any } from '@angular-ru/common/typings';

export function isString(value: Any): value is string {
    return typeof value === 'string';
}
