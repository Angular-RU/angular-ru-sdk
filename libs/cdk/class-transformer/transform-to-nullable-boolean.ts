import {coerceBoolean} from '@angular-ru/cdk/coercion';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';
import {TransformFnParams} from 'class-transformer/types/interfaces';

export function transformToNullableBoolean({
    value,
}: TransformFnParams): Nullable<boolean> {
    return isNil(value) ? null : coerceBoolean(value);
}
