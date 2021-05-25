import { PlainObject } from '@angular-ru/common/typings';

import { ExcelWorksheet, PreparedExcelWorksheet } from './excel-worksheet';

export interface ExcelWorkbook<T> {
    filename: string;
    translatedKeys?: PlainObject;
    worksheets: ExcelWorksheet<T>[];
}

export interface PreparedExcelWorkbook<T> extends ExcelWorkbook<T> {
    worksheets: PreparedExcelWorksheet<T>[];
    preparedTranslatedKeys: PlainObject;
}
