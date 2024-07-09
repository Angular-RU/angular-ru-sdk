import {TableFilterType} from '../../services/filterable/table-filter-type';

export const IGNORE_FILTER_TYPES: TableFilterType[] = [
    TableFilterType.DOES_NOT_EQUAL,
    TableFilterType.DOES_NOT_CONTAIN,
    TableFilterType.MORE_THAN,
    TableFilterType.LESS_THAN,
    TableFilterType.MORE_OR_EQUAL,
    TableFilterType.LESS_OR_EQUAL,
];
