import { Nullable } from '@angular-ru/common/typings';

export interface SelectFromTableResult<T> {
    items: T[];
    first: Nullable<T>;
}
