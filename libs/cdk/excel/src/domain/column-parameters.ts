import { Nullable } from '@angular-ru/cdk/typings';

import { ColumnWidth } from './column-width';

export interface ColumnParameters {
    width?: Nullable<number | ColumnWidth>;
    excelType?: Nullable<string>;
}
