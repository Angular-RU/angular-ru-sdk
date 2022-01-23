import { Any, EmptyValue } from '@angular-ru/cdk/typings';

import { checkValueIsEmpty } from './check-value-is-empty';

export function checkSomeValueIsEmpty(...values: Any[]): boolean {
    return values.some((element: Any): element is EmptyValue => checkValueIsEmpty(element));
}
