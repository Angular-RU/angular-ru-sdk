import { Any } from '@angular-ru/common/typings';

import { isFalse } from './is-false';

export function checkEveryValueIsFalse(...values: Any[]): boolean {
    return values.length === 0 ? false : values.every(isFalse);
}
