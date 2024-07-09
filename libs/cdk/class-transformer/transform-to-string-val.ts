import {toStringValue} from '@angular-ru/cdk/string';
import {TransformFnParams} from 'class-transformer/types/interfaces';

export function transformToStringVal({value}: TransformFnParams): string {
    return toStringValue(value);
}
