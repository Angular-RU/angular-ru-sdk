import { Any } from '@angular-ru/common/typings';

import { checkValueIsEmpty } from './check-value-is-empty';

export function checkEveryValueIsEmpty(...values: Any[]): boolean {
    return values.every(checkValueIsEmpty);
}
