import {Nullable} from './nullable';

export type LastOfTuple<ArrayType> = ArrayType extends unknown[]
    ? ArrayType extends []
        ? undefined
        : ArrayType extends [unknown, ...unknown[]]
          ? ArrayType[ArrayType extends [unknown, ...infer Rest]
                ? Rest['length']
                : number]
          : Nullable<ArrayType[number]>
    : undefined;
