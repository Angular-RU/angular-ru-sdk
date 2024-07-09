import {replaceUndefinedOrNull} from './internal/replace-undefined-or-null';

export function clean<T>(object: T): T {
    return JSON.parse(JSON.stringify(object, replaceUndefinedOrNull));
}
