import { TableFilterType } from './table-filter-type';

export interface FilterGlobalOpts {
    value: string | null;
    type: string | TableFilterType | null;
}
