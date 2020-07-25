import { Any } from './any';

export interface PlainObject {
    [key: string]: Any;
}

export interface PlainObjectOf<T> {
    [key: string]: T;
}
