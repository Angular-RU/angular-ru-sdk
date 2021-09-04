import { Any } from '@angular-ru/cdk/typings';

export function isString(value: Any): value is string {
    return typeof value === 'string';
}
