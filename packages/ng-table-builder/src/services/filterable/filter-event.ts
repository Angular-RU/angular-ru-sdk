import { Nullable } from '@angular-ru/common/typings';

import { TableFilterType } from './table-filter-type';

export interface FilterEvent {
    value: Nullable<string>;
    type: Nullable<string | TableFilterType>;
}
