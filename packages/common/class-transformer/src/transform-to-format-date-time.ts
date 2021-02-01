import { toFormatDateTime } from '@angular-ru/common/date';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformToFormatDateTime({ value }: TransformFnParams): string {
    return toFormatDateTime(value);
}
