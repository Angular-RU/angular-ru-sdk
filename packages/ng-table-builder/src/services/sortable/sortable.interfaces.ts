import { PlainObjectOf } from '@angular-ru/common/typings';

import { TableRow } from '../../interfaces/table-builder.external';

// eslint-disable-next-line
export enum SortOrderType {
    ASC = 'asc',
    DESC = 'desc'
}

export interface SortableMessage {
    definition: PlainObjectOf<SortOrderType>;
    source: TableRow[];
}
