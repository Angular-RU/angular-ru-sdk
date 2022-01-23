import { Any } from '@angular-ru/cdk/typings';

import { checkValueIsEmpty } from './check-value-is-empty';

export function checkEveryValueIsEmpty(...values: Any[]): boolean {
    return values.every((element: Any): element is boolean => checkValueIsEmpty(element));
}
