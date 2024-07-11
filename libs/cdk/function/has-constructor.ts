import {Type} from '@angular/core';
import {Fn, Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

export function hasConstructor<T>(
    object?: Nullable<Fn | Type<T> | typeof Object.constructor>,
): boolean {
    return isNotNil(object?.prototype) && isNotNil(object?.prototype.constructor.name);
}
