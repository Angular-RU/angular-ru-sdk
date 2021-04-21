import { Any } from '@angular-ru/common/typings';

import { isFalse } from './is-false';

export function checkEveryValueIsFalse(...values: Any[]): boolean {
    if (values.length === 0) {
        return false;
    }
    return values.every(isFalse);
}
