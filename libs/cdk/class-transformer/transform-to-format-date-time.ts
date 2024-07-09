import {toFormatDateTime} from '@angular-ru/cdk/date';
import {TransformFnParams} from 'class-transformer/types/interfaces';

export function transformToFormatDateTime({value}: TransformFnParams): string {
    return toFormatDateTime(value);
}
