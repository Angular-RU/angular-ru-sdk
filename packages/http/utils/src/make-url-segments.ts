import { DataClientRequestOptions, DataUrlPathSegment } from '@angular-ru/http/typings';

import { replaceLeadingAndTrailingSlashes } from './replace-leading-and-trailing-slashes';

export function makeUrlSegments(
    { hostUrl, baseUrl }: Partial<DataClientRequestOptions> = {},
    restUrl: string = '',
    pathUrl: string = ''
): DataUrlPathSegment {
    const clearHostUrl: string =
        replaceLeadingAndTrailingSlashes(hostUrl) || `${window.location.protocol}//${window.location.host}`;
    const clearBaseUrl: string = replaceLeadingAndTrailingSlashes(baseUrl);
    const clearRestUrl: string = replaceLeadingAndTrailingSlashes(restUrl);
    const clearPathUrl: string = replaceLeadingAndTrailingSlashes(pathUrl);
    return {
        hostUrl: clearHostUrl,
        baseUrl: clearBaseUrl,
        restUrl: clearRestUrl,
        pathUrl: clearPathUrl
    };
}
