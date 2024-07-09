import {Nullable} from '@angular-ru/cdk/typings';

import {TableFilterType} from './table-filter-type';

export interface FilterGlobalOptions {
    value: Nullable<string>;
    type: Nullable<string | TableFilterType>;
}
