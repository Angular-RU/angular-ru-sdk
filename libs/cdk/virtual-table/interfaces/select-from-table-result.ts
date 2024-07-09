import {Nullable} from '@angular-ru/cdk/typings';

export interface SelectFromTableResult<T> {
    items: T[];
    first: Nullable<T>;
}
