import { Any } from '@angular-ru/common/typings';

import { checkValueIsEmpty } from './check-value-is-empty';

export function checkSomeValueIsEmpty(...values: Any[]): boolean {
    return values.some(checkValueIsEmpty);
}
