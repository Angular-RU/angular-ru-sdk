import { replaceUndefinedOrNull } from './internal/replace-undefined-or-null';

export function clean<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj, replaceUndefinedOrNull));
}
