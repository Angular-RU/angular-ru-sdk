import {Nullable} from '@angular-ru/cdk/typings';

import {clean} from './clean';

export function checkIsShallowEmpty<T>(definition: Nullable<T>): boolean {
    return Object.keys(clean(definition ?? {})).length === 0;
}
