import { DataClientRequestOptions, DataUrlPathSegment } from '@angular-ru/http/typings';

import { removeLeadingAndTrailingSlashes } from './remove-leading-and-trailing-slashes';

export function makeUrlSegments(
    { hostUrl, baseUrl, restUrl }: Partial<DataClientRequestOptions> = {},
    pathUrl: string = ''
): DataUrlPathSegment {
    const host: string = hostUrl ?? `${window.location.protocol}//${window.location.host}`;
    const base: string = baseUrl?.trim() || '';
    const rest: string = restUrl?.trim() || '';
    const path: string = pathUrl.trim();
    return {
        hostUrl: removeLeadingAndTrailingSlashes(host),
        baseUrl: removeLeadingAndTrailingSlashes(base),
        restUrl: removeLeadingAndTrailingSlashes(rest),
        pathUrl: removeLeadingAndTrailingSlashes(path)
    };
}
