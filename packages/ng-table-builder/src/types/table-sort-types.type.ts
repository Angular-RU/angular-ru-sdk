import { PlainObjectOf, SortOrderType, StringValuesOfEnum } from '@angular-ru/common/typings';

export type TableSortTypes = PlainObjectOf<SortOrderType | StringValuesOfEnum<SortOrderType>> | null;
