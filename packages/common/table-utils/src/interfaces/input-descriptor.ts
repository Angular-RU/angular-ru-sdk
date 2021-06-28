import { PlainObject } from '@angular-ru/common/typings';

import { RulesDescriptor } from './rules-descriptor';

export interface InputDescriptor<T extends PlainObject> {
    entries: T[];
    rules?: RulesDescriptor;
}
