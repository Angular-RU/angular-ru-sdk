import { toPrettyFormat } from '@angular-ru/common/date';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformToPrettyFormat({ value }: TransformFnParams): string | null {
    return toPrettyFormat(value);
}
