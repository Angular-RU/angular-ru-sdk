import { Any } from '@angular-ru/common/typings';

import { isTrue } from './is-true';

export function checkEveryValueIsTrue(...values: Any[]): boolean {
    return values.length === 0 ? false : values.every(isTrue);
}
