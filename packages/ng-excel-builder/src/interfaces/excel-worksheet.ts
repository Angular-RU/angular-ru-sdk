import { EntriesKeys } from './entries-keys';

export interface ExcelWorksheet<T> {
    entries: T[];
    worksheetName: string;
    prefixKeyForTranslate?: string;
    keys?: EntriesKeys<T>;
    excludeKeys?: EntriesKeys<T>;
}
