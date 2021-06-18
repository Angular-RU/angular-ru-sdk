import { Nullable } from '@angular-ru/common/typings';

import { EntriesKeys } from './entries-keys';

export interface ExcelWorksheet<T> {
    entries: Nullable<T[]>;
    worksheetName: string;
    prefixKeyForTranslate?: string;
    keys?: EntriesKeys<T>;
    excludeKeys?: EntriesKeys<T>;
}
