import { toPrettyFormat } from '@angular-ru/common/date';
import { Nullable } from '@angular-ru/common/typings';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformToPrettyFormat({ value }: TransformFnParams): Nullable<string> {
    return toPrettyFormat(value);
}
