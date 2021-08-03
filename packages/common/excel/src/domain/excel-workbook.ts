import { Nullable, PlainObject } from '@angular-ru/common/typings';

import { ExcelWorksheet } from './excel-worksheet';

export interface ExcelWorkbook<T> {
    filename: string;
    translatedKeys?: Nullable<PlainObject>;
    worksheets: ExcelWorksheet<T>[];
}
