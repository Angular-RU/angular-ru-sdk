import {EmptyValue} from '@angular-ru/cdk/typings';

import {checkValueIsEmpty} from './check-value-is-empty';

export function checkSomeValueIsEmpty(...values: any[]): boolean {
    return values.some((element: any): element is EmptyValue =>
        checkValueIsEmpty(element),
    );
}
