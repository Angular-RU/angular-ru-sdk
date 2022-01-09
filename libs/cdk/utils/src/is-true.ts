import { Any } from '@angular-ru/cdk/typings';

export function isTrue(value: Any): value is true {
    return value === true;
}
