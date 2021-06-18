import { Nullable } from '@angular-ru/common/typings';

export function takeThirdItem<T>(array?: Nullable<T[]>): Nullable<T> {
    const thirdItemIndex: number = 2;
    return array?.[thirdItemIndex];
}
