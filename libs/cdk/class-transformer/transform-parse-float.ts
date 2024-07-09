import {TransformFnParams} from 'class-transformer/types/interfaces';

export function transformParseFloat({value}: TransformFnParams): number {
    return parseFloat(value);
}
