import {Nullable, TupleItem} from '@angular-ru/cdk/typings';

export function takeSecondItem<ArrayType extends Nullable<unknown[]>>(
    array?: ArrayType,
): TupleItem<ArrayType, 1> {
    return (Array.isArray(array) ? array[1] : undefined) as TupleItem<ArrayType, 1>;
}
