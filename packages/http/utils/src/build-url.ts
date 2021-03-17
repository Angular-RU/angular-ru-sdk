import { DataUrlPathSegment } from '@angular-ru/http/typings';

import { getPathWithoutQueryParams } from './get-path-without-params';
import { isAbsolutePath } from './is-absolute-path';
import { replaceDoubleSlash } from './replace-double-slash';

export function buildUrl(path: string, { hostUrl, baseUrl, restUrl, pathUrl }: DataUrlPathSegment): string {
    let fullUrl: string;

    if (isAbsolutePath(path)) {
        fullUrl = path;
    } else {
        const clearPath: string = getPathWithoutQueryParams(path || pathUrl);
        fullUrl = `${hostUrl}/${baseUrl}/${restUrl}/${clearPath}`;
    }

    return replaceDoubleSlash(fullUrl);
}
