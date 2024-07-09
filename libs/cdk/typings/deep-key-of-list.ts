import {Leaves} from './leaves';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export type DeepKeyOfList<T, D extends number = 10> = Leaves<T, D>[];
