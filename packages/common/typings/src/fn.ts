import { Any } from './any';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Fn<T = Any, U = Any> = (...args: U[]) => T;
