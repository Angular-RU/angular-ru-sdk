import { Any } from '@angular-ru/common/typings';

import { TableFilterType } from './table-filter-type';

export interface FilterDescriptor {
    key: string;
    value: Any;
    type: TableFilterType;
}
