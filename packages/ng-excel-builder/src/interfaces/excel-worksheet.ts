import { EntriesKeys } from './entries-keys';

export interface ExcelWorksheet<T> {
    entries: T[] | null | undefined;
    worksheetName: string;
    prefixKeyForTranslate?: string;
    keys?: EntriesKeys<T>;
    excludeKeys?: EntriesKeys<T>;
}
