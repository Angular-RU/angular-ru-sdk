import { Nullable } from '@angular-ru/common/typings';

export function takeSecondItem<T>(array?: Nullable<T[]>): Nullable<T> {
    return array?.[1];
}
