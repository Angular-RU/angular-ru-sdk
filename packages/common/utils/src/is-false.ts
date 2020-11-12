import { Any } from '@angular-ru/common/typings';

export function isFalse(value: Any): value is false {
    return value === false;
}
