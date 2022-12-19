import { Nullable } from '@angular-ru/cdk/typings';

import { ColumnWidth } from './column-width';
import { ExcelType } from './excel-type';

export interface ColumnParameters {
    width?: Nullable<number | ColumnWidth>;
    excelType?: Nullable<ExcelType>;
}
