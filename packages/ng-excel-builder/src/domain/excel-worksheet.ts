import { Nullable, PlainObjectOf } from '@angular-ru/common/typings';

import { ColumnParameters } from './column-parameters';
import { EntriesKeys } from './entries-keys';

export interface ExcelWorksheet<T> {
    entries: Nullable<T[]>;
    worksheetName: string;
    prefixKeyForTranslate?: Nullable<string>;
    keys?: Nullable<EntriesKeys<T>>;
    excludeKeys?: Nullable<EntriesKeys<T>>;
    columnParameters?: Nullable<PlainObjectOf<ColumnParameters>>;
}
