import { DataUrlPathSegment } from '@angular-ru/http/typings';

import { getPathWithoutQueryParams } from './get-path-without-params';
import { isAbsolutePath } from './is-absolute-path';
import { replaceDoubleSlash } from './replace-double-slash';

export function urlParse(path: string, { hostUrl, baseUrl }: DataUrlPathSegment): string {
    let fullUrl: string;

    if (isAbsolutePath(path)) {
        fullUrl = path;
    } else {
        const url: string = `${baseUrl}/${getPathWithoutQueryParams(path)}`;
        fullUrl = isAbsolutePath(baseUrl) ? url : `${hostUrl}/${url}`;
    }

    return replaceDoubleSlash(fullUrl);
}
