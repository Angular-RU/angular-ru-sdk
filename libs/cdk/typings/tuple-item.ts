import {InfiniteTuple} from './infinite-tuple';
import {Nullable} from './nullable';

export type TupleItem<ArrayType, Index extends number> = ArrayType extends unknown[]
    ? ArrayType extends [unknown, ...InfiniteTuple<unknown, Index>]
        ? ArrayType[Index]
        : Nullable<ArrayType[Index]>
    : undefined;
