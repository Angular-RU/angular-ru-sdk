import { Type } from '@angular/core';
import { typeofType } from '@angular-ru/common/function';

export function transformToClass<T>(classType: Type<T>): () => Type<T> {
    if (!Reflect) {
        throw new Error(`You are forgot add: import 'reflect-metadata';`);
    }

    return typeofType(classType);
}
