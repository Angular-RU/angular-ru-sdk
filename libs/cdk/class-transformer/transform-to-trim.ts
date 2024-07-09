import {trim} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {TransformFnParams} from 'class-transformer/types/interfaces';

export function transformToTrim({value}: TransformFnParams): Nullable<string> {
    return trim(value);
}
