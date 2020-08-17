import { SortOrderType } from '@angular-ru/common/typings';

type SortDirection = SortOrderType | 'asc' | 'desc' | '';

export interface EntitySortBy<V> {
    sortBy: keyof V;
    sortByOrder: SortDirection;
}

export type EntityCompareFn<V> = (a: V, b: V) => number;

export type EntityComparator<V> = EntitySortBy<V> | EntityCompareFn<V>;
