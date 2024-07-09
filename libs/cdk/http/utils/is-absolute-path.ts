import {Nullable} from '@angular-ru/cdk/typings';
import {isTruthy} from '@angular-ru/cdk/utils';

export function isAbsolutePath(
    path: string,
    matcher: RegExp = /^(http|https):\/\//,
): boolean {
    const result: Nullable<string[]> = path.match(matcher);

    return isTruthy(result);
}
