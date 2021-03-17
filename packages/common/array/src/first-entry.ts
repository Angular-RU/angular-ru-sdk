export function firstEntry<EntryType, ArrayType extends EntryType[]>(
    array: ArrayType
): ArrayType[0] | (ArrayType extends [EntryType, ...EntryType[]] ? never : undefined) {
    return array[0];
}
