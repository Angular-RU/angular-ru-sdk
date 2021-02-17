import { Any } from '@angular-ru/common/typings';

import { checkValueIsEmpty } from './check-value-is-empty';

export function checkValueIsFilled(value: Any): boolean {
    return !checkValueIsEmpty(value);
}
