import {EmptyValue} from '@angular-ru/cdk/typings';

import {checkValueIsEmpty} from './check-value-is-empty';

export function checkValueIsFilled<T>(value: EmptyValue | T): value is T {
    return !checkValueIsEmpty<T>(value);
}
