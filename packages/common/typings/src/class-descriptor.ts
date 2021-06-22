import { Nullable } from './nullable';
import { PlainObject } from './object-types';

export type ClassDescriptor = Nullable<string | string[] | Set<string> | PlainObject>;
