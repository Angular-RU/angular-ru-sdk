import { ensureRegexp } from './ensure-regexp';

export function matchedByRegExp(regexp: string, value: string): boolean {
    return !!value.match(new RegExp(ensureRegexp(regexp), 'ig'))?.[0];
}
