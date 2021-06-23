import { Nullable, PlainObject, PlainObjectOf } from '@angular-ru/common/typings';

import { EntriesKeys } from './entries-keys';

export interface ExcelWorksheet<T> {
    entries: Nullable<T[]>;
    worksheetName: string;
    prefixKeyForTranslate?: string;
    keys?: EntriesKeys<T>;
    excludeKeys?: EntriesKeys<T>;
    columnParameters?: PlainObjectOf<ColumnParameters>;
}

export interface ColumnParameters {
    width?: number | ColumnWidth;
}

export const enum ColumnWidth {
    MAX_WIDTH = 'MAX_WIDTH'
}

export interface PreparedExcelWorksheet<T> extends ExcelWorksheet<T> {
    flatEntries: PlainObject[];
}
