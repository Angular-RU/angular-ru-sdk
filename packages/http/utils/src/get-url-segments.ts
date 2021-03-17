import { DataClientRequestOptions, DataUrlPathSegment } from '@angular-ru/http/typings';

import { replaceDoubleSlash } from './replace-double-slash';

export function getUrlSegments({
    hostUrl,
    baseUrl,
    restUrl,
    pathUrl
}: Partial<DataClientRequestOptions> = {}): DataUrlPathSegment {
    const base: string = baseUrl?.trim() ? `/${baseUrl}/` : '';
    const host: string = hostUrl ?? `${window.location.protocol}//${window.location.host}`;
    const rest: string = restUrl?.trim() ? `/${restUrl}/` : '';
    const path: string = pathUrl?.trim() ? `/${pathUrl}/` : '';
    return {
        hostUrl: replaceDoubleSlash(`${host}/`),
        baseUrl: replaceDoubleSlash(base),
        restUrl: replaceDoubleSlash(rest),
        pathUrl: replaceDoubleSlash(path)
    };
}
