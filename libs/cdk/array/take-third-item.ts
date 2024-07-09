import {Nullable, TupleItem} from '@angular-ru/cdk/typings';

type ThirdItemIndex = 2;
const thirdItemIndex: ThirdItemIndex = 2;

export function takeThirdItem<ArrayType extends Nullable<unknown[]>>(
    array?: ArrayType,
): TupleItem<ArrayType, ThirdItemIndex> {
    return (Array.isArray(array) ? array[thirdItemIndex] : undefined) as TupleItem<
        ArrayType,
        ThirdItemIndex
    >;
}
