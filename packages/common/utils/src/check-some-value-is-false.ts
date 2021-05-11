import { Any } from '@angular-ru/common/typings';

import { isFalse } from './is-false';

export function checkSomeValueIsFalse(...values: Any[]): boolean {
    return values.some(isFalse);
}
