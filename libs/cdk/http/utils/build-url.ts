import {DataUrlPathSegment} from '@angular-ru/cdk/http/typings';
import {checkValueIsFilled} from '@angular-ru/cdk/utils';

import {getPathWithoutQueryParams} from './get-path-without-params';
import {isAbsolutePath} from './is-absolute-path';
import {replaceDoubleSlash} from './replace-double-slash';

export function buildUrl({
    hostUrl,
    baseUrl,
    restUrl,
    pathUrl,
}: DataUrlPathSegment): string {
    let fullUrl: string;

    if (isAbsolutePath(pathUrl)) {
        fullUrl = pathUrl;
    } else {
        const clearPathUrl: string = getPathWithoutQueryParams(pathUrl);

        fullUrl = [hostUrl, baseUrl, restUrl, clearPathUrl]
            .filter((element: string): element is string => checkValueIsFilled(element))
            .join('/');
    }

    return replaceDoubleSlash(fullUrl);
}
