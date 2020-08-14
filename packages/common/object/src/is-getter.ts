import { Any } from '@angular-ru/common/typings';

import { isSimpleObject } from './is-simple-object';

export function isGetter(obj: Any, prop: string): boolean {
    let result: boolean = false;

    if (isSimpleObject(obj)) {
        while (obj !== null) {
            if (obj?.hasOwnProperty(prop)) {
                result = !!Object.getOwnPropertyDescriptor(obj, prop)?.['get'];
                break;
            } else {
                obj = Object.getPrototypeOf(obj);
            }
        }
    }

    return result;
}
