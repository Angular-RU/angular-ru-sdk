import { SerialDateFormatOptions, toFormatDateTime } from '@angular-ru/common/date';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformDateToFormat(
    options?: SerialDateFormatOptions
): (transformFnParams: TransformFnParams) => string {
    return ({ value }: TransformFnParams): string => toFormatDateTime(value, options);
}
