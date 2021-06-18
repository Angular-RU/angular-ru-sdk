import { Nullable } from '@angular-ru/common/typings';

export function takeFirstItem<T>(array?: Nullable<T[]>): Nullable<T> {
    return array?.[0];
}
