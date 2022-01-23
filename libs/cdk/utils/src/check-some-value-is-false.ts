import { Any } from '@angular-ru/cdk/typings';

import { isFalse } from './is-false';

export function checkSomeValueIsFalse(...values: Any[]): boolean {
    return values.some((element: Any): element is boolean => isFalse(element));
}
