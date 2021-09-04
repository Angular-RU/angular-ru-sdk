import { Any } from '@angular-ru/cdk/typings';

import { TableFilterType } from './table-filter-type';

export interface FilterDescriptor {
    key: string;
    value: Any;
    type: TableFilterType;
}
