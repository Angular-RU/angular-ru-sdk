export type Resolver<T> = (value?: T | PromiseLike<T>) => void;
