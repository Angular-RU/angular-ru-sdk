import {isNotNil} from '@angular-ru/cdk/utils';

import {ensureRegexp} from './ensure-regexp';

export function matchedByRegExp(regexp: string | RegExp, value: string): boolean {
    const matcher: RegExp =
        regexp instanceof RegExp ? regexp : new RegExp(ensureRegexp(regexp), 'ig');

    return isNotNil(value.match(matcher)?.[0]);
}
