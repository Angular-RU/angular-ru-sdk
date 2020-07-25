import { Any } from './any';

export type Fn<T = Any, U = Any> = (...args: U[]) => T;
