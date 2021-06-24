import { PlainObject } from '@angular-ru/common/typings';

import { ExcelWorksheet } from './excel-worksheet';

export interface ExcelWorkbook<T> {
    filename: string;
    translatedKeys?: PlainObject;
    worksheets: ExcelWorksheet<T>[];
}
