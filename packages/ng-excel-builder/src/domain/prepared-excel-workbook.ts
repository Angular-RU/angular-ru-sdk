import { PlainObject } from '@angular-ru/common/typings';

import { ExcelWorkbook } from './excel-workbook';
import { PreparedExcelWorksheet } from './prepared-excel-worksheet';

export interface PreparedExcelWorkbook<T> extends ExcelWorkbook<T> {
    worksheets: PreparedExcelWorksheet<T>[];
    preparedTranslatedKeys: PlainObject;
}
