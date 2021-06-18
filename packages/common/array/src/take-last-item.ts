import { Nullable } from '@angular-ru/common/typings';

export function takeLastItem<T>(array?: Nullable<T[]>): Nullable<T> {
    return array?.[array?.length - 1];
}
