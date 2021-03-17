export function secondEntry<EntryType, ArrayType extends EntryType[]>(
    array: ArrayType
): ArrayType[1] | (ArrayType extends [EntryType, EntryType, ...EntryType[]] ? ArrayType[1] : undefined) {
    return array[1];
}
