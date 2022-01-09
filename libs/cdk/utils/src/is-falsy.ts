import { Any } from '@angular-ru/cdk/typings';

import { isTruthy } from './is-truthy';

export function isFalsy(val: Any): boolean {
    return !isTruthy(val);
}
