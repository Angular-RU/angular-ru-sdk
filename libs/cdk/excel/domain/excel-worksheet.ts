import {Nullable, PlainObjectOf} from '@angular-ru/cdk/typings';

import {ColumnParameters} from './column-parameters';
import {EntriesKeys} from './entries-keys';

export interface ExcelWorksheet<T> {
    entries: Nullable<T[]>;
    worksheetName?: Nullable<string>;
    prefixKeyForTranslate?: Nullable<string>;
    keys?: Nullable<EntriesKeys<T>>;
    excludeKeys?: Nullable<EntriesKeys<T>>;
    columnParameters?: Nullable<PlainObjectOf<ColumnParameters>>;
    generalColumnParameters?: Nullable<ColumnParameters>;
}
