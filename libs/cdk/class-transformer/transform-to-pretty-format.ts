import {toPrettyFormat} from '@angular-ru/cdk/date';
import {Nullable} from '@angular-ru/cdk/typings';
import {TransformFnParams} from 'class-transformer/types/interfaces';

export function transformToPrettyFormat({value}: TransformFnParams): Nullable<string> {
    return toPrettyFormat(value);
}
