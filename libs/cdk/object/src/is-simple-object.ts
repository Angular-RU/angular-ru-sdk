import { Any } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

import { instanceOfPlainObject } from './internal/instance-of-plain-object';

export function isSimpleObject(value: Any): boolean {
    return isNotNil(value) && typeof value == 'object' && instanceOfPlainObject(value);
}
