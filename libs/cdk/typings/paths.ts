import {Join} from './join';
import {Prev} from './prev';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export type Paths<T, D extends number = 10> = [D] extends [never]
    ? never
    : T extends object
      ? {
            [K in keyof T]-?: K extends number | string
                ? Join<K, Paths<T[K], Prev[D]>> | `${K}`
                : never;
        }[keyof T]
      : '';
