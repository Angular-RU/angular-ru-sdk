import {PlainObjectOf} from '@angular-ru/cdk/typings';

import {TableFilterType} from './table-filter-type';

export interface FilterColumnsOptions {
    isEmpty: boolean;
    values: PlainObjectOf<string>;
    types: PlainObjectOf<TableFilterType>;
}
