export type LastOfTuple<ArrayType> = ArrayType extends unknown[]
    ? ArrayType extends []
        ? undefined
        : ArrayType[ArrayType extends [unknown, ...infer Rest] ? Rest['length'] : number]
    : undefined;
