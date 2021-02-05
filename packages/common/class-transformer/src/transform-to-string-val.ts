import { toStringVal } from '@angular-ru/common/string';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformToStringVal({ value }: TransformFnParams): string {
    return toStringVal(value);
}
