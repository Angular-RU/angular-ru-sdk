import { Any, PlainObject, PlainObjectOf } from '@angular-ru/common/typings';

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
