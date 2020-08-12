import { Any } from '@angular-ru/common/typings';

import { instanceOfPlainObject } from './internal/instance-of-plain-object';

export function isSimpleObject(value: Any): boolean {
    return value != null && typeof value == 'object' && instanceOfPlainObject(value);
}
