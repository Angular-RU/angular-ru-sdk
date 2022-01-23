import { Any } from '@angular-ru/cdk/typings';

import { isTruthy } from './is-truthy';

export function isFalsy(value: Any): boolean {
    return !isTruthy(value);
}
