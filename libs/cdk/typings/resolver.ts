export type Resolver<T> = (value?: PromiseLike<T> | T) => void;
