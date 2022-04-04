import { Fn } from '@angular-ru/cdk/typings';

import { instanceOfPlainObject } from './internal/instance-of-plain-object';

export function isPlainObject(plainObject: any): boolean {
    let constructorRef: Fn;
    let prototypeRef: Fn;

    if (!instanceOfPlainObject(plainObject)) {
        return false;
    }

    // If has modified constructor
    // eslint-disable-next-line prefer-const
    constructorRef = plainObject.constructor;

    if (constructorRef === undefined) {
        return true;
    }

    // If has modified prototype
    // eslint-disable-next-line prefer-const
    prototypeRef = constructorRef.prototype;

    if (!instanceOfPlainObject(prototypeRef)) {
        return false;
    }

    // If constructor does not have an Object-specific method
    if (!prototypeRef.hasOwnProperty('isPrototypeOf')) {
        return false;
    }

    // Most likely a plain Object
    return true;
}
