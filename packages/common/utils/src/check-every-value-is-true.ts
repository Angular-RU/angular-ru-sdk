import { Any } from '@angular-ru/common/typings';

import { isTrue } from './is-true';

export function checkEveryValueIsTrue(...values: Any[]): boolean {
    if (values.length === 0) {
        return false;
    }
    return values.every(isTrue);
}
