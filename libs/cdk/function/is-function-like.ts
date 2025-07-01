import {Fn} from '@angular-ru/cdk/typings';

export function isFunctionLike<U = Fn>(fn: any): fn is U {
    return typeof fn === 'function';
}
