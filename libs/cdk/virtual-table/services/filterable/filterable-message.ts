import {FilterColumnsOptions} from './filter-columns-options';
import {FilterGlobalOptions} from './filter-global-options';
import {TableFilterType} from './table-filter-type';

export interface FilterableMessage<T> {
    source: T[];
    types: typeof TableFilterType;
    global: FilterGlobalOptions;
    columns: FilterColumnsOptions;
}
