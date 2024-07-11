import {Nullable} from './nullable';
import {PlainObject} from './plain-object';

export type ClassDescriptor = Nullable<PlainObject | Set<string> | string[] | string>;
