import {LastOfTuple, Nullable} from '@angular-ru/cdk/typings';

export function takeLastItem<ArrayType extends Nullable<unknown[]>>(
    array?: ArrayType,
): LastOfTuple<ArrayType> {
    return (
        Array.isArray(array) ? array[array.length - 1] : undefined
    ) as LastOfTuple<ArrayType>;
}
