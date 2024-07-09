import {coerceBoolean} from '@angular-ru/cdk/coercion';
import {TransformFnParams} from 'class-transformer/types/interfaces';

export function transformToBoolean({value}: TransformFnParams): boolean {
    return coerceBoolean(value);
}
