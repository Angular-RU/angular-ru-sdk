import {Nullable} from './nullable';
import {PlainObject} from './plain-object';

export type ClassDescriptor = Nullable<string | string[] | Set<string> | PlainObject>;
