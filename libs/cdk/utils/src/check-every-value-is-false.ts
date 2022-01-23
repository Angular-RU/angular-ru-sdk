import { Any } from '@angular-ru/cdk/typings';

import { isFalse } from './is-false';

export function checkEveryValueIsFalse(...values: Any[]): boolean {
    return values.length === 0 ? false : values.every((element: Any): element is boolean => isFalse(element));
}
