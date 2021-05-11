import { PlainObjectOf } from '@angular-ru/common/typings';

import { TableFilterType } from './table-filter-type';

export interface FilterColumnsOpts {
    isEmpty: boolean;
    values: PlainObjectOf<string>;
    types: PlainObjectOf<TableFilterType>;
}
