import { FilterColumnsOpts } from './filter-columns-opts';
import { FilterGlobalOpts } from './filter-global-opts';
import { TableFilterType } from './table-filter-type';

export interface FilterableMessage<T> {
    source: T[];
    types: typeof TableFilterType;
    global: FilterGlobalOpts;
    columns: FilterColumnsOpts;
}
