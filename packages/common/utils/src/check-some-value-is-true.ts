import { Any } from '@angular-ru/common/typings';

import { isTrue } from './is-true';

export function checkSomeValueIsTrue(...values: Any[]): boolean {
    return values.some(isTrue);
}
