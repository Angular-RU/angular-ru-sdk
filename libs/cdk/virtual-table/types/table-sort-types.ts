import {
    Nullable,
    PlainObjectOf,
    SortOrderType,
    StringValuesOfEnum,
} from '@angular-ru/cdk/typings';

export type TableSortTypes = Nullable<
    PlainObjectOf<SortOrderType | StringValuesOfEnum<SortOrderType>>
>;
