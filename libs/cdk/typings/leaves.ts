import {Join} from './join';
import {Prev} from './prev';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export type Leaves<T, D extends number = 10> = [D] extends [never]
    ? never
    : T extends object
      ? {[K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>>}[keyof T]
      : '';
