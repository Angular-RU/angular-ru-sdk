import { Any } from '@angular-ru/cdk/typings';

export function isNumber(value: Any): value is number {
    return typeof value === 'number';
}
