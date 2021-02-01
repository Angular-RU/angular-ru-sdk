import { trim } from '@angular-ru/common/string';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformToTrim({ value }: TransformFnParams): string | null | undefined {
    return trim(value);
}
