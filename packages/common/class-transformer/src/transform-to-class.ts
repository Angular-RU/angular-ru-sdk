import { Type } from '@angular/core';
import { typeofType } from '@angular-ru/common/function';
import { isNil } from '@angular-ru/common/utils';

export function transformToClass<T>(classType: Type<T>): () => Type<T> {
    if (isNil(Reflect)) {
        throw new Error(`You are forgot add: import 'reflect-metadata';`);
    }

    return typeofType(classType);
}
