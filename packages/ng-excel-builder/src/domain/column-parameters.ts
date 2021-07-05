import { Nullable } from '@angular-ru/common/typings';

import { ColumnWidth } from './column-width';

export interface ColumnParameters {
    width?: Nullable<number | ColumnWidth>;
}
