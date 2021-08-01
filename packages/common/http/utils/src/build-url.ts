import { DataUrlPathSegment } from '@angular-ru/common/http/typings';
import { checkValueIsFilled } from '@angular-ru/common/utils';

import { getPathWithoutQueryParams } from './get-path-without-params';
import { isAbsolutePath } from './is-absolute-path';
import { replaceDoubleSlash } from './replace-double-slash';

export function buildUrl({ hostUrl, baseUrl, restUrl, pathUrl }: DataUrlPathSegment): string {
    let fullUrl: string;

    if (isAbsolutePath(pathUrl)) {
        fullUrl = pathUrl;
    } else {
        const clearPathUrl: string = getPathWithoutQueryParams(pathUrl);
        fullUrl = [hostUrl, baseUrl, restUrl, clearPathUrl].filter(checkValueIsFilled).join('/');
    }

    return replaceDoubleSlash(fullUrl);
}
