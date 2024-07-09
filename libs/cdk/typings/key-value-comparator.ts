import {KeyValue} from '@angular/common';

export type KeyValueComparator<K, V> = (a: KeyValue<K, V>, b: KeyValue<K, V>) => number;
