import { Any } from '@angular-ru/common/typings';
import { isNil } from '@angular-ru/common/utils';

export function isString(value: Any): value is string {
    return typeof value === 'string' && !isNil(value);
}
