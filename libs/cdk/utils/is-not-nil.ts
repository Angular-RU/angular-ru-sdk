import {Nullable} from '@angular-ru/cdk/typings';

import {isNil} from './is-nil';

export function isNotNil<T>(value: Nullable<T>): value is T {
    return !isNil(value);
}
