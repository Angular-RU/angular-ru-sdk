import { toUnix } from '@angular-ru/common/date';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformToUnix({ value }: TransformFnParams): number {
    return toUnix(value);
}
