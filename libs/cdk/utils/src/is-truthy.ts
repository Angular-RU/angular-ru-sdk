import { Any } from '@angular-ru/cdk/typings';

export function isTruthy(value: Any): boolean {
    return Boolean(value);
}
