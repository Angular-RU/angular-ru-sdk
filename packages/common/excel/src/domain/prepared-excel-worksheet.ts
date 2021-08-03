import { PlainObject } from '@angular-ru/common/typings';

import { ExcelWorksheet } from './excel-worksheet';

export interface PreparedExcelWorksheet<T> extends ExcelWorksheet<T> {
    flatEntries: PlainObject[];
}
