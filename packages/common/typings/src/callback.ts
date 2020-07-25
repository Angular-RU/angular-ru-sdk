import { Any } from './any';

export type Callback<T = Any, U = Any> = (...args: U[]) => T;
