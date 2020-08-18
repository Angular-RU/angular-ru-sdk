import { PlainObjectOf } from '@angular-ru/common/typings';

import { clean } from './clean';

export function checkIsEmpty(definition: PlainObjectOf<string>): boolean {
    return Object.keys(clean(definition)).length === 0;
}
