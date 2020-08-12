import { KeyValue } from '@angular/common';

import { Any } from './any';

export type KeyValueComparator = (a: KeyValue<string, Any>, b: KeyValue<string, Any>) => number;
