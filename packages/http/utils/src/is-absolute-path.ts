import { Nullable } from '@angular-ru/common/typings';
import { isTruthy } from '@angular-ru/common/utils';

export function isAbsolutePath(path: string, matcher: RegExp = /^(http|https):\/\//): boolean {
    const result: Nullable<string[]> = path.match(matcher);
    return isTruthy(result);
}
