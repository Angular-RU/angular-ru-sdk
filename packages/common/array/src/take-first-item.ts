import { Nullable, TupleItem } from '@angular-ru/common/typings';

export function takeFirstItem<ArrayType extends Nullable<unknown[]>>(array?: ArrayType): TupleItem<ArrayType, 0> {
    return (Array.isArray(array) ? array[0] : undefined) as TupleItem<ArrayType, 0>;
}
