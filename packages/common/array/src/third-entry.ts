/* eslint-disable @typescript-eslint/no-magic-numbers */
export function thirdEntry<ArrayType, T extends ArrayType[]>(
    array: T
): T[2] | (T extends [ArrayType, ArrayType, ArrayType, ...ArrayType[]] ? never : undefined) {
    return array[2];
}
