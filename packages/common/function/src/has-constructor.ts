import { Type } from '@angular/core';
import { Fn } from '@angular-ru/common/typings';

export function hasConstructor<T>(obj?: Type<T> | Fn | null | typeof Object.constructor): boolean {
    return !!obj?.prototype && !!obj?.prototype.constructor.name;
}
