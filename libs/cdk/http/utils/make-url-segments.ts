import {DataClientRequestOptions, DataUrlPathSegment} from '@angular-ru/cdk/http/typings';

import {replaceLeadingAndTrailingSlashes} from './replace-leading-and-trailing-slashes';

export function makeUrlSegments(
    {hostUrl, baseUrl}: Partial<DataClientRequestOptions> = {},
    restUrl = '',
    pathUrl = '',
): DataUrlPathSegment {
    const clearHostUrl: string =
        replaceLeadingAndTrailingSlashes(hostUrl) ||
        `${window.location.protocol}//${window.location.host}`;

    return {
        hostUrl: clearHostUrl,
        baseUrl: replaceLeadingAndTrailingSlashes(baseUrl),
        restUrl: replaceLeadingAndTrailingSlashes(restUrl),
        pathUrl: replaceLeadingAndTrailingSlashes(pathUrl),
    };
}
