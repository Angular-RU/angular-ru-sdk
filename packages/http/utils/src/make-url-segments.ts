import { DataClientRequestOptions, DataUrlPathSegment } from '@angular-ru/http/typings';

import { replaceLeadingAndTrailingSlashes } from './replace-leading-and-trailing-slashes';

export function makeUrlSegments(
    { hostUrl, baseUrl }: Partial<DataClientRequestOptions> = {},
    restUrl: string = '',
    pathUrl: string = ''
): DataUrlPathSegment {
    const host: string = hostUrl ?? `${window.location.protocol}//${window.location.host}`;
    const base: string = baseUrl?.trim() || '';
    const rest: string = restUrl.trim();
    const path: string = pathUrl.trim();
    return {
        hostUrl: replaceLeadingAndTrailingSlashes(host),
        baseUrl: replaceLeadingAndTrailingSlashes(base),
        restUrl: replaceLeadingAndTrailingSlashes(rest),
        pathUrl: replaceLeadingAndTrailingSlashes(path)
    };
}
