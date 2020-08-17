import { PlainObjectOf, SortOrderType } from '@angular-ru/common/typings';

import { TableRow } from '../../interfaces/table-builder.external';

export interface SortableMessage {
    definition: PlainObjectOf<SortOrderType>;
    source: TableRow[];
}
