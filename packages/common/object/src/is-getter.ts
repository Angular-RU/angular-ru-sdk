import { Any } from '@angular-ru/common/typings';

import { isPlainObject } from './is-plain-object';

export function isGetter(obj: Any, prop: string | symbol): boolean {
    let isGetterProperty: boolean;

    try {
        let prototypeRef: Any;

        if (isPlainObject(obj)) {
            prototypeRef = obj;
        } else {
            prototypeRef = Object.getPrototypeOf(obj);
        }

        isGetterProperty = !!Object.getOwnPropertyDescriptor(prototypeRef, prop)?.['get'];
    } catch {
        isGetterProperty = false;
    }

    return isGetterProperty;
}
