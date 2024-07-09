import {TransformFnParams} from 'class-transformer/types/interfaces';

export function transformParseInt({value}: TransformFnParams): number {
    return parseInt(value);
}
