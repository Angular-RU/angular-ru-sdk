import { Any } from '@angular-ru/cdk/typings';

export function isBoolean(value: Any): value is boolean {
    return typeof value === 'boolean';
}
