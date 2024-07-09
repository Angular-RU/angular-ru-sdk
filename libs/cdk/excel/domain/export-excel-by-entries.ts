export interface ExportExcelByEntries<T> {
    excelExport(entries: T[]): void;
}
