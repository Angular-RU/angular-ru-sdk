import { InfiniteTuple } from './infinite-tuple';

export type TupleItem<ArrayType, Index extends number> = ArrayType extends unknown[]
    ? ArrayType extends [unknown, ...InfiniteTuple<unknown, Index>]
        ? ArrayType[Index]
        : ArrayType[Index] | undefined
    : undefined;
