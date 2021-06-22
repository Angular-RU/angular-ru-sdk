import { Nullable } from '@angular-ru/common/typings';

import { isNil } from './is-nil';

export function isNotNil<T>(value: Nullable<T>): value is T {
    return !isNil(value);
}
