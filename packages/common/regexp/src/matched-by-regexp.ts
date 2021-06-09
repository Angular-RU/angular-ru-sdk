import { isNotNil } from '@angular-ru/common/utils';

import { ensureRegexp } from './ensure-regexp';

export function matchedByRegExp(regexp: string, value: string): boolean {
    const matcher: RegExp = new RegExp(ensureRegexp(regexp), 'ig');
    return isNotNil(value.match(matcher)?.[0]);
}
