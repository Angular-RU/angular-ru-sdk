import { TableRow } from '../../interfaces/table-builder.external';
import { KeyMap } from '../../interfaces/table-builder.internal';

// eslint-disable-next-line
export enum SortOrderType {
    ASC = 'asc',
    DESC = 'desc'
}

export interface SortableMessage {
    definition: KeyMap<SortOrderType>;
    source: TableRow[];
}
