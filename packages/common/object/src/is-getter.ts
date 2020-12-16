import { Any } from '@angular-ru/common/typings';

import { isSimpleObject } from './is-simple-object';

export function isGetter(obj: Any, prop: string): boolean {
    let currentObj: Any = obj;
    let result: boolean = false;

    if (isSimpleObject(currentObj)) {
        while (currentObj !== null) {
            if (currentObj?.hasOwnProperty(prop)) {
                result = !!Object.getOwnPropertyDescriptor(currentObj, prop)?.['get'];
                break;
            } else {
                currentObj = Object.getPrototypeOf(currentObj);
            }
        }
    }

    return result;
}
