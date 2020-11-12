import { Any } from '@angular-ru/common/typings';

export function isTrue(value: Any): value is true {
    return value === true;
}
