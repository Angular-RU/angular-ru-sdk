import { DataRequestOptions, DataUrlPathSegment } from '@angular-ru/http/typings';

import { replaceDoubleSlash } from './replace-double-slash';

export function getUrlSegments({ hostUrl, baseUrl }: Partial<DataRequestOptions> = {}): DataUrlPathSegment {
    const base: string = baseUrl?.trim() ? `/${baseUrl}/` : '';
    const host: string = hostUrl ?? `${window.location.protocol}//${window.location.host}`;
    return { hostUrl: replaceDoubleSlash(`${host}/`), baseUrl: replaceDoubleSlash(base) };
}
