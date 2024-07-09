import {Nullable, PlainObject} from '@angular-ru/cdk/typings';

import {RulesDescriptor} from './rules-descriptor';

export interface InputDescriptor<T extends PlainObject> {
    entries: T[];
    rules: Nullable<RulesDescriptor>;
}
