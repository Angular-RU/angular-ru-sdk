import { Any } from '@angular-ru/cdk/typings';
import { isTrue } from '@angular-ru/cdk/utils';

import { isSimpleObject } from './is-simple-object';

export function isGetter(object: Any, prop: string): boolean {
    let currentObject: Any = object;
    let result: boolean = false;

    if (isSimpleObject(currentObject)) {
        while (currentObject !== null) {
            if (isTrue(currentObject?.hasOwnProperty(prop))) {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                result = Boolean(Object.getOwnPropertyDescriptor(currentObject, prop)?.get);
                break;
            } else {
                currentObject = Object.getPrototypeOf(currentObject);
            }
        }
    }

    return result;
}
