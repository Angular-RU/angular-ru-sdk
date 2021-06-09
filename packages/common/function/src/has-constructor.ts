import { Type } from '@angular/core';
import { Fn } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

export function hasConstructor<T>(obj?: Type<T> | Fn | null | typeof Object.constructor): boolean {
    return isNotNil(obj?.prototype) && isNotNil(obj?.prototype.constructor.name);
}
