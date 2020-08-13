import { Any, Fn } from '@angular-ru/common/typings';

export function isFunctionLike<U = Fn>(fn: Any): fn is U {
    return typeof fn === 'function';
}
