import { Any } from '@angular-ru/cdk/typings';

export function isFalse(value: Any): value is false {
    return value === false;
}
