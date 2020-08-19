import { Any } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { instanceOfPlainObject } from './internal/instance-of-plain-object';

export function isSimpleObject(value: Any): boolean {
    return isNotNil(value) && typeof value == 'object' && instanceOfPlainObject(value);
}
