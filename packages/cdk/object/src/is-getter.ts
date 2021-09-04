import { Any } from '@angular-ru/cdk/typings';
import { isTrue } from '@angular-ru/cdk/utils';

import { isSimpleObject } from './is-simple-object';

export function isGetter(obj: Any, prop: string): boolean {
    let currentObj: Any = obj;
    let result: boolean = false;

    if (isSimpleObject(currentObj)) {
        while (currentObj !== null) {
            if (isTrue(currentObj?.hasOwnProperty(prop))) {
                result = !!Object.getOwnPropertyDescriptor(currentObj, prop)?.['get'];
                break;
            } else {
                currentObj = Object.getPrototypeOf(currentObj);
            }
        }
    }

    return result;
}
