export type LastOfTuple<ArrayType> = ArrayType extends unknown[]
    ? ArrayType extends []
        ? undefined
        : ArrayType extends [unknown, ...unknown[]]
        ? ArrayType[ArrayType extends [unknown, ...infer Rest] ? Rest['length'] : number]
        : ArrayType[number] | undefined
    : undefined;
