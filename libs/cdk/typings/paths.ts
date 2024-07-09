import {Join} from './join';
import {Prev} from './prev';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export type Paths<T, D extends number = 10> = [D] extends [never]
    ? never
    : // eslint-disable-next-line @typescript-eslint/ban-types
      T extends object
      ? {
            [K in keyof T]-?: K extends string | number
                ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
                : never;
        }[keyof T]
      : '';
