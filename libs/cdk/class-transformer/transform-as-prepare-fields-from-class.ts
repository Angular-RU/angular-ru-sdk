import {Type} from '@angular/core';
import {Fn} from '@angular-ru/cdk/typings';
import {TransformFnParams} from 'class-transformer/types/interfaces';

export function transformAsPrepareFieldsFromClass<T>(classRef: Type<T>): Fn<T> {
    return ({value}: TransformFnParams): T => ({...new classRef(), ...value});
}
