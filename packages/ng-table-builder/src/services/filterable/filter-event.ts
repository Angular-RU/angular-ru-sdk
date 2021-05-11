import { TableFilterType } from './table-filter-type';

export interface FilterEvent {
    value: string | null;
    type: string | TableFilterType | null;
}
