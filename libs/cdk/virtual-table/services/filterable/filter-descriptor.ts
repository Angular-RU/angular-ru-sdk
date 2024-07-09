import {TableFilterType} from './table-filter-type';

export interface FilterDescriptor {
    key: string;
    value: any;
    type: TableFilterType;
}
