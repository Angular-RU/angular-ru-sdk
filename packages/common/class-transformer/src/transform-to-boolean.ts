import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformToBoolean({ value }: TransformFnParams): boolean {
    return Boolean(value);
}
