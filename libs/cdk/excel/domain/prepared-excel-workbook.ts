import {PlainObject} from '@angular-ru/cdk/typings';

import {ExcelWorkbook} from './excel-workbook';
import {PreparedExcelWorksheet} from './prepared-excel-worksheet';

export interface PreparedExcelWorkbook<T> extends ExcelWorkbook<T> {
    worksheets: Array<PreparedExcelWorksheet<T>>;
    widthOfSymbols: WidthOfSymbols;
    preparedTranslatedKeys: PlainObject;
}

export interface WidthOfSymbols {
    regular: Record<string, number>;
    bold: Record<string, number>;
}
