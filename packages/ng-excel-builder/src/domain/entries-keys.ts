import { Leaves } from '@angular-ru/common/typings';

import { KeyDeepSize } from './excel-key-deep-size';

export type EntriesKeys<T> = [Leaves<T, KeyDeepSize>, ...Leaves<T, KeyDeepSize>[]];
