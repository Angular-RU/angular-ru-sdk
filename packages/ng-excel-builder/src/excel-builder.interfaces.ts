import { Any, PlainObject, PlainObjectOf } from '@angular-ru/common/typings';
import { Observable } from 'rxjs';

export interface ExcelWorkbook<T = Any> {
    filename: string;
    worksheets: ExcelWorksheet<T>[];
    translateColumns: PlainObject;
}

export interface ExcelWorksheet<T = Any> {
    table: PlainObjectOf<T>[];
    worksheetName: string;
    titleKey: string;
    excludeKeys?: string[];
}

export interface ExportExcelByEntries<T> {
    excelExport(entries: T[]): void;
}

export interface ExcelBuilderTextColumnInterceptor {
    instant?(key?: string | null): string | undefined | null;
    getTranslatedColumn?(): Observable<PlainObject | null>;
}
