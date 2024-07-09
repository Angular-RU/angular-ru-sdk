import {isNotNil} from '@angular-ru/cdk/utils';

import {instanceOfPlainObject} from './internal/instance-of-plain-object';

export function isSimpleObject<T>(value: T): boolean {
    return isNotNil(value) && typeof value == 'object' && instanceOfPlainObject(value);
}
