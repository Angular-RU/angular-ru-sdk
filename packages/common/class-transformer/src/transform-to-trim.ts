import { trim } from '@angular-ru/common/string';
import { Nullable } from '@angular-ru/common/typings';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformToTrim({ value }: TransformFnParams): Nullable<string> {
    return trim(value);
}
