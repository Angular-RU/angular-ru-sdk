import { Type } from '@angular/core';
import { Fn, Nullable } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

export function hasConstructor<T>(obj?: Nullable<Type<T> | Fn | typeof Object.constructor>): boolean {
    return isNotNil(obj?.prototype) && isNotNil(obj?.prototype.constructor.name);
}
