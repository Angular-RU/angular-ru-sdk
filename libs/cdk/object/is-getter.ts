import {isTrue} from '@angular-ru/cdk/utils';

import {isSimpleObject} from './is-simple-object';

export function isGetter<T>(object: T, prop: string): boolean {
    let currentObject: any = object;
    let result = false;

    if (isSimpleObject(currentObject)) {
        while (currentObject !== null) {
            if (isTrue(currentObject?.hasOwnProperty(prop))) {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                result = Boolean(
                    Object.getOwnPropertyDescriptor(currentObject, prop)?.get,
                );
                break;
            } else {
                currentObject = Object.getPrototypeOf(currentObject);
            }
        }
    }

    return result;
}
